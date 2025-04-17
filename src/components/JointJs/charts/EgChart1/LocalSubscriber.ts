/**
 * LocalSubscriber for EgChart1
 *
 * This module handles NATS subscriptions for the EgChart1 component.
 * It manages connections to the NATS server, subscribes to relevant topics,
 * and provides cleanup functionality when the component is unmounted.
 *
 * The module follows a clear lifecycle:
 * 1. Initialize NATS connection
 * 2. Subscribe to required topics
 * 3. Process incoming messages
 * 4. Clean up subscriptions when no longer needed
 *
 * @module LocalSubscriber
 */

import {
  initNatsClient,
  subscribeToTopic,
  isConnected,
  cleanupAllSubscriptions,
  checkPublisherExists
} from '@/components/nats/natsSubscriberService'
import type { NatsConnectionConfig } from '@/components/nats/natsSubscriberService'
import { localTopics, getSensorColor } from './LocalFunctions'
import {
  CONNECTION_STATES,
  updateConnectionStatus,
  checkNATSConnectionStatus
} from './LocalFunctions'

import { logger } from '@/utils/logger'
import * as joint from '@joint/core'

// Constants for timeouts and retry settings
export const DEFAULT_TIMEOUT = 5000
export const DEFAULT_RETRY_INTERVAL = 2000
export const DEFAULT_MAX_RETRIES = 3

/**
 * NATS configuration with environment variables
 * Using environment variables for sensitive information
 */
export const natsConfig: NatsConnectionConfig = {
  servers: import.meta.env.VITE_NATS_SERVER || 'wss://localhost:8181',
  user: import.meta.env.VITE_NATS_USER || 'sys_user',
  pass: import.meta.env.VITE_NATS_PASS || 'Sys_P@ss',
  timeout: DEFAULT_TIMEOUT,
  pingInterval: 30000, // 30 seconds ping interval
  reconnect: true,
  maxReconnectAttempts: 5
}

/**
 * Interface for subscription results
 */
export interface SubscriptionResult {
  success: boolean
  topic: string
  error?: Error
}

/**
 * Interface for message handler functions
 */
export interface MessageHandler {
  (message: string): void
}

// Store subscription cleanup functions
const unsubscribeFunctions: Map<string, () => void> = new Map()

/**
 * Subscribes to a specific topic and handles the received messages
 * @param topic - The NATS topic to subscribe to
 * @param handler - Function to handle incoming messages
 * @returns Promise resolving to a subscription result
 */
export async function subscribeToLocalTopic(
  topic: string,
  handler: MessageHandler
): Promise<SubscriptionResult> {
  try {
    logger.debug(`Attempting to subscribe to topic: ${topic}`)

    // Check if publisher exists for this topic
    const publisherExists = await checkPublisherExists(topic)
    if (!publisherExists) {
      logger.warn(`No publisher found for topic: ${topic}`)
      // Continue anyway, as publisher might appear later
    }

    const subscription = await subscribeToTopic(
      topic,
      (msg: string) => {
        logger.debug(`Received message on topic ${topic}: ${msg}`)
        handler(msg)
      },
      {
        timeout: DEFAULT_TIMEOUT,
        retryInterval: DEFAULT_RETRY_INTERVAL,
        maxRetries: DEFAULT_MAX_RETRIES
      }
    )

    // Store the unsubscribe function for cleanup
    if (subscription && subscription.unsubscribe) {
      unsubscribeFunctions.set(topic, subscription.unsubscribe)
    }

    logger.info(`Successfully subscribed to topic: ${topic}`)
    return { success: true, topic }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error(`Failed to subscribe to topic ${topic}: ${errorMessage}`)
    return {
      success: false,
      topic,
      error: error instanceof Error ? error : new Error(`Failed to subscribe to ${topic}`)
    }
  }
}

/**
 * Initializes the NATS client and subscribes to all required topics
 * @returns Promise with the result of the subscription process
 */
export async function localSubscriber(shapesRef?: { [key: string]: joint.dia.Element }): Promise<{
  success: boolean
  connectionStatus: string
  subscriptions: SubscriptionResult[]
  error?: Error
}> {
  // update status to connecting
  updateConnectionStatus(CONNECTION_STATES.CONNECTING)

  const subscriptionResults: SubscriptionResult[] = []

  try {
    // Step 1: Initialize NATS client connection
    logger.info('Initializing NATS client connection')
    const client = await initNatsClient(natsConfig)

    // Step 2: Check if connection was successful
    if (!client || !isConnected()) {
      const error = new Error('Failed to connect to NATS server')
      logger.error(error.message)

      // Update status to disconnected
      updateConnectionStatus(CONNECTION_STATES.DISCONNECTED)

      return {
        success: false,
        connectionStatus: CONNECTION_STATES.DISCONNECTED,
        subscriptions: [],
        error
      }
    }
    // Update status to connected
    updateConnectionStatus(CONNECTION_STATES.CONNECTED)
    logger.info('Successfully connected to NATS server')

    // Step 3: Subscribe to topics
    // Temperature topic subscription
    const temperatureResult = await subscribeToLocalTopic(
      localTopics.temperature,
      (msg: string) => {
        logger.info('Temperature in Oven:', msg)
        // Update the local topic value
        localTopics.temperature = msg
        // Update the color of shape1 based on temperature
        if (shapesRef && shapesRef.obj1) {
          const color = getSensorColor('Temperature', msg)
          shapesRef.obj1.attr('body/fill', color)
          logger.debug(`Updated shape1 color to ${color} based on temperature ${msg}`)
        }

        // Emit an event that can be listened to by components
        window.dispatchEvent(new CustomEvent('temperature-update', { detail: msg }))
      }
    )
    subscriptionResults.push(temperatureResult)

    // Current topic subscription
    const currentResult = await subscribeToLocalTopic(localTopics.current, (msg: string) => {
      logger.info('Current in Oven:', msg)
      // Update the local topic value
      localTopics.current = msg

      // Update the color of shape2 based on current
      if (shapesRef && shapesRef.obj2) {
        const color = getSensorColor('Current', msg)
        shapesRef.obj2.attr('body/fill', color)
        logger.debug(`Updated shape2 color to ${color} based on current ${msg}`)
      }
      // Emit an event that can be listened to by components
      window.dispatchEvent(new CustomEvent('current-update', { detail: msg }))
    })
    subscriptionResults.push(currentResult)

    // Check if all subscriptions were successful
    const allSuccessful = subscriptionResults.every((result) => result.success)

    return {
      success: allSuccessful,
      connectionStatus: checkNATSConnectionStatus(),
      subscriptions: subscriptionResults
    }
  } catch (error) {
    // Update status to error/disconnected
    updateConnectionStatus(CONNECTION_STATES.DISCONNECTED)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error(`Error setting up NATS subscriptions: ${errorMessage}`)

    return {
      success: false,
      connectionStatus: CONNECTION_STATES.DISCONNECTED,
      subscriptions: subscriptionResults,
      error: error instanceof Error ? error : new Error('Unknown error in NATS subscription')
    }
  }
}

/**
 * Unsubscribes from a specific topic
 * @param topic - The topic to unsubscribe from
 * @returns Whether the unsubscription was successful
 */
export function unsubscribeFromTopic(topic: string): boolean {
  try {
    const unsubscribe = unsubscribeFunctions.get(topic)
    if (unsubscribe) {
      unsubscribe()
      unsubscribeFunctions.delete(topic)
      logger.info(`Successfully unsubscribed from topic: ${topic}`)
      return true
    }
    logger.warn(`No active subscription found for topic: ${topic}`)
    return false
  } catch (error) {
    logger.error(`Error unsubscribing from topic ${topic}:`, error)
    return false
  }
}

/**
 * Cleans up all subscriptions and closes the NATS connection
 * @returns Promise that resolves when cleanup is complete
 */
export async function localCleanup(): Promise<boolean> {
  try {
    logger.info('Cleaning up NATS subscriptions')
    // Update connection status
    updateConnectionStatus(CONNECTION_STATES.DISCONNECTED)
    // Clean up individual subscriptions
    unsubscribeFunctions.forEach((unsubscribe, topic) => {
      try {
        unsubscribe()
        logger.debug(`Unsubscribed from topic: ${topic}`)
      } catch (error) {
        logger.error(`Error unsubscribing from topic ${topic}:`, error)
      }
    })

    // Clear the map
    unsubscribeFunctions.clear()

    // Clean up all subscriptions at the service level
    await cleanupAllSubscriptions()

    logger.info('NATS cleanup completed successfully')
    return true
  } catch (error) {
    logger.error('Error during NATS cleanup:', error)
    return false
  }
}

/**
 * Gets the current connection status
 * @returns The current connection status
 */
// export function checkNATSConnectionStatus(): string {
//   return isConnected() ? 'connected' : 'disconnected'
// }

/**
 * Gets the list of active subscriptions
 * @returns Array of topic names that are currently subscribed
 */
export function getActiveSubscriptions(): string[] {
  return Array.from(unsubscribeFunctions.keys())
}
