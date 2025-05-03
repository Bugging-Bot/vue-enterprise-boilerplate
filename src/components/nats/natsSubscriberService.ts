import { connect } from 'nats.ws'
import type { NatsConnection, Subscription, ConnectionOptions } from 'nats.ws'
import { logger } from '@/utils/logger'

let nc: NatsConnection | null = null
let connectionAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_DELAY_MS = 2000

// Store active subscriptions for cleanup
const activeSubscriptions: Map<string, Subscription> = new Map()

/**
 * Configuration options for establishing a NATS connection
 * @property {string | string[]} servers - NATS server URL(s) to connect to
 * @property {string} user - Username for NATS server authentication
 * @property {string} pass - Password for NATS server authentication
 * @property {number} [timeout] - Connection timeout in milliseconds
 * @property {number} [pingInterval] - Interval between connection ping checks
 * @property {boolean} [reconnect] - Whether to automatically attempt reconnection
 * @property {number} [maxReconnectAttempts] - Maximum number of reconnection attempts
 */
export interface NatsConnectionConfig {
  servers: string | string[]
  user: string
  pass: string
  timeout?: number
  pingInterval?: number
  reconnect?: boolean
  maxReconnectAttempts?: number
}

/**
 * Initializes a NATS WebSocket client connection with optional configuration.
 *
 * @param {NatsConnectionConfig} [config] - Optional configuration for NATS connection
 * @returns {Promise<NatsConnection | null>} A promise resolving to a NATS connection or null if connection fails
 *
 * @description
 * Establishes a NATS connection with automatic reconnection and connection management.
 * Reuses existing connection if already established and not closed. Supports custom
 * connection settings and handles connection retry logic.
 */
export async function initNatsClient(
  config?: NatsConnectionConfig
): Promise<NatsConnection | null> {
  // Check if already connected
  if (nc && !nc.isClosed()) return nc

  // Default configuration
  const defaultConfig: NatsConnectionConfig = {
    servers: 'wss://localhost:8181',
    user: 'sys_user',
    pass: 'Sys_P@ss',
    timeout: 5000, // 5 seconds connection timeout
    pingInterval: 30000, // 30 seconds ping interval
    reconnect: true,
    maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS
  }

  const connectionConfig = { ...defaultConfig, ...config }

  try {
    connectionAttempts++

    // Create connection options
    const options: ConnectionOptions = {
      servers: connectionConfig.servers,
      user: connectionConfig.user,
      pass: connectionConfig.pass,
      timeout: connectionConfig.timeout,
      pingInterval: connectionConfig.pingInterval,
      reconnect: connectionConfig.reconnect,
      maxReconnectAttempts: connectionConfig.maxReconnectAttempts
    }

    nc = await connect(options)

    console.log('✅ Connected to NATS via WebSocket')
    connectionAttempts = 0 // Reset attempts on successful connection

    // Setup connection status monitoring
    nc.closed().then((err) => {
      if (err) {
        console.error('❌ NATS connection closed with error:', err)
      } else {
        console.log('NATS connection closed gracefully')
      }
      nc = null
    })

    return nc
  } catch (error) {
    console.error('❌ Failed to connect to NATS server:', error)

    if (connectionAttempts < MAX_RECONNECT_ATTEMPTS && connectionConfig.reconnect) {
      console.log(
        `Attempting to reconnect (${connectionAttempts}/${MAX_RECONNECT_ATTEMPTS}) in ${RECONNECT_DELAY_MS}ms...`
      )

      // Wait before attempting to reconnect
      await new Promise((resolve) => setTimeout(resolve, RECONNECT_DELAY_MS))
      return initNatsClient(connectionConfig)
    } else {
      console.error(`❌ Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached. Giving up.`)
      return null
    }
  }
}

/**
 * Subscribes to a NATS topic with configurable retry and timeout options.
 *
 * @param subject - The NATS subject/topic to subscribe to
 * @param callback - Function to handle received messages
 * @param options - Optional configuration for subscription behavior
 * @param options.timeout - Maximum time to wait for subscription (default: 10000ms)
 * @param options.retryInterval - Delay between retry attempts (default: 2000ms)
 * @param options.maxRetries - Maximum number of reconnection attempts (default: 3)
 *
 * @returns An object containing the subscription and an unsubscribe method
 */
export async function subscribeToTopic(
  subject: string,
  callback: (msg: string) => void,
  options: { timeout?: number; retryInterval?: number; maxRetries?: number } = {}
): Promise<{ subscription: Subscription | null; unsubscribe: () => void }> {
  const { timeout = 10000, retryInterval = 2000, maxRetries = 3 } = options

  let retryCount = 0
  let subscription: Subscription | null = null

  const subscribe = async (): Promise<Subscription | null> => {
    try {
      const client = await initNatsClient()
      if (!client) {
        throw new Error('Failed to initialize NATS client')
      }

      // Create subscription with timeout
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(
          () => reject(new Error(`Subscription to ${subject} timed out after ${timeout}ms`)),
          timeout
        )
      })

      const subscribePromise = Promise.resolve(client.subscribe(subject))

      subscription = (await Promise.race([subscribePromise, timeoutPromise])) as Subscription

      if (subscription) {
        console.log(`✅ Successfully subscribed to ${subject}`)
        activeSubscriptions.set(subject, subscription)

        // Setup message handling with error handling
        ;(async () => {
          try {
            for await (const msg of subscription) {
              try {
                callback(msg.string())
              } catch (callbackError) {
                console.error(`❌ Error in message callback for ${subject}:`, callbackError)
              }
            }
          } catch (iterationError) {
            console.error(`❌ Subscription iteration error for ${subject}:`, iterationError)

            // If the subscription fails during iteration, try to resubscribe
            if (retryCount < maxRetries) {
              retryCount++
              console.log(
                `Attempting to resubscribe to ${subject} (${retryCount}/${maxRetries})...`
              )
              setTimeout(() => subscribe(), retryInterval)
            } else {
              console.error(
                `❌ Max resubscription attempts (${maxRetries}) reached for ${subject}. Giving up.`
              )
            }
          }
        })()

        return subscription
      }
      return null
    } catch (error) {
      console.error(`❌ Error subscribing to ${subject}:`, error)

      if (retryCount < maxRetries) {
        retryCount++
        console.log(
          `Attempting to resubscribe to ${subject} (${retryCount}/${maxRetries}) in ${retryInterval}ms...`
        )
        await new Promise((resolve) => setTimeout(resolve, retryInterval))
        return subscribe()
      } else {
        console.error(
          `❌ Max subscription attempts (${maxRetries}) reached for ${subject}. Giving up.`
        )
        return null
      }
    }
  }
  subscription = await subscribe()

  // Return the subscription and an unsubscribe function
  return {
    subscription,
    unsubscribe: () => {
      if (subscription) {
        try {
          subscription.unsubscribe()
          activeSubscriptions.delete(subject)
          console.log(`Unsubscribed from ${subject}`)
        } catch (error) {
          console.error(`❌ Error unsubscribing from ${subject}:`, error)
        }
      }
    }
  }
}

/**
 * Checks if the NATS client is currently connected and not closed.
 *
 * @returns {boolean} True if the NATS client is connected, false otherwise.
 */
export function isConnected(): boolean {
  return nc !== null && !nc.isClosed()
}

/**
 * Checks if a publisher exists for a given NATS subject by attempting to receive a message.
 *
 * @param subject - The NATS subject to check for an active publisher
 * @param timeout - Maximum time to wait for a message, defaults to 5000ms
 * @returns A promise resolving to a boolean indicating whether a publisher exists
 */
export async function checkPublisherExists(subject: string, timeout = 5000): Promise<boolean> {
  if (!isConnected()) {
    await initNatsClient()
    if (!isConnected()) {
      return false
    }
  }

  return new Promise((resolve) => {
    let messageReceived = false
    let checkSubscription: Subscription | null = null

    const timeoutId = setTimeout(() => {
      if (!messageReceived && checkSubscription) {
        checkSubscription.unsubscribe()
        resolve(false)
      }
    }, timeout)

    // Create a temporary subscription to check for messages
    if (nc) {
      checkSubscription = nc.subscribe(subject, {
        max: 1,
        callback: async (msg) => {
          messageReceived = true
          clearTimeout(timeoutId)
          if (checkSubscription) {
            checkSubscription.unsubscribe()
          }
          resolve(true)
        }
      })
    } else {
      clearTimeout(timeoutId)
      resolve(false)
    }
  })
}

/**
 * Cleans up all active NATS subscriptions and closes the NATS connection.
 *
 * This function unsubscribes from all active subscriptions in the activeSubscriptions map,
 * logs successful unsubscriptions, and handles any unsubscription errors. It then clears
 * the activeSubscriptions map and closes the NATS connection if one exists.
 */
export function cleanupAllSubscriptions(): void {
  // Unsubscribe from all active subscriptions
  for (const [subject, subscription] of activeSubscriptions.entries()) {
    try {
      subscription.unsubscribe()
      console.log(`Unsubscribed from ${subject}`)
    } catch (error) {
      console.error(`❌ Error unsubscribing from ${subject}:`, error)
    }
  }

  activeSubscriptions.clear()

  // Close NATS connection if it exists
  if (nc) {
    try {
      nc.close()
      console.log('NATS connection closed')
    } catch (error) {
      console.error(`❌ Error closing NATS connection:`, error)
    } finally {
      nc = null
    }
  }
}
