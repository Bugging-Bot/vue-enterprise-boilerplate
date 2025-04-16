/**
 * Initializes NATS subscriptions for sensor topics with advanced configuration and handling
 *
 * @param {InitializeSubscriptionsOptions} options - Configuration for sensor topic subscriptions
 * @returns {Promise<SubscriptionResult>} A promise resolving to subscription management details
 * @description Sets up real-time subscriptions to sensor topics, manages connection status,
 * updates graph shapes based on received data, and provides cleanup mechanism
 */
import type { Ref } from 'vue'
import * as joint from '@joint/core'
import { subscribeToTopic, checkPublisherExists } from '@/components/nats/natsSubscriberService'

// Define interface for subscription options
interface SubscriptionOptions {
  timeout: number
  retryInterval: number
  maxRetries: number
}

// Define interface for the options parameter
interface InitializeSubscriptionsOptions {
  topics: Record<string, string>
  shapes: Record<string, joint.dia.Element>
  graph: joint.dia.Graph
  sensorValues: Record<string, string | number>
  getColorFunction: (sensorType: string, value: string | number) => string
  updateTextFunction?: (sensorName: string, value: string | number) => void
  emitFunction?: (event: string, payload?: any) => void
  subscriptionOptions?: SubscriptionOptions
}

// Define interface for the return value
interface SubscriptionResult {
  connectionStatus: Ref<string>
  subscriptionStatuses: Record<string, boolean>
  error?: Error
  cleanup: () => void
}

/**
 * Initializes subscriptions to sensor topics and handles data updates
 *
 * @param {InitializeSubscriptionsOptions} options - Configuration options for subscriptions
 * @returns {Promise<SubscriptionResult>} - Subscription status and cleanup function
 */
export async function initializeSubscriptions({
  topics,
  shapes,
  graph,
  sensorValues,
  getColorFunction,
  updateTextFunction,
  emitFunction,
  subscriptionOptions = {
    timeout: 5000,
    retryInterval: 2000,
    maxRetries: 3
  }
}: InitializeSubscriptionsOptions): Promise<SubscriptionResult> {
  // Initialize state
  const connectionStatus: Ref<string> = ref('connecting')
  const subscriptionStatuses: Record<string, boolean> = {}
  const unsubscribeFunctions: Array<() => void> = []

  try {
    // Emit connection status if emit function provided
    if (emitFunction) {
      emitFunction('connection-status-change', 'connecting')
    }

    // Check if publishers exist for each topic
    const publisherChecks: Record<string, boolean> = {}
    for (const [sensorName, topic] of Object.entries(topics)) {
      publisherChecks[sensorName] = await checkPublisherExists(topic)
      console.log(`${sensorName} publisher exists: ${publisherChecks[sensorName]}`)
    }

    // Subscribe to each topic
    for (const [sensorName, topic] of Object.entries(topics)) {
      const subscription = await subscribeToTopic(
        topic,
        (msg: string) => {
          // Update sensor value
          sensorValues[sensorName] = msg

          // Emit data update if emit function provided
          if (emitFunction) {
            emitFunction('data-update', { sensor: sensorName, value: msg })
          }

          // Update shape if it exists
          if (shapes[sensorName]) {
            // Start batch updates for performance
            graph.trigger('batch:start')

            // Update shape color
            const color = getColorFunction(sensorName, msg)
            shapes[sensorName].attr('body/fill', color)

            // Update shape text if update function provided
            if (updateTextFunction) {
              updateTextFunction(sensorName, msg)
            }

            // End batch updates
            graph.trigger('batch:stop')
          }
        },
        subscriptionOptions
      )

      // Track subscription status
      if (subscription.subscription) {
        subscriptionStatuses[sensorName] = true
        unsubscribeFunctions.push(subscription.unsubscribe)
      } else {
        subscriptionStatuses[sensorName] = false
      }
    }

    // Determine overall connection status
    const allSubscribed = Object.values(subscriptionStatuses).every(
      (status: boolean) => status === true
    )
    connectionStatus.value = allSubscribed ? 'connected' : 'error'

    // Emit final connection status if emit function provided
    if (emitFunction) {
      emitFunction('connection-status-change', connectionStatus.value)
    }

    return {
      connectionStatus,
      subscriptionStatuses,
      cleanup: () => {
        // Clean up individual subscriptions
        unsubscribeFunctions.forEach((unsubscribe: () => void) => unsubscribe())
      }
    }
  } catch (error) {
    console.error('Error initializing subscriptions:', error)
    connectionStatus.value = 'error'

    // Emit error if emit function provided
    if (emitFunction) {
      emitFunction('error', error)
      emitFunction('connection-status-change', 'error')
    }

    return {
      connectionStatus,
      subscriptionStatuses,
      error: error as Error,
      cleanup: () => {
        // Clean up any subscriptions that might have been created
        unsubscribeFunctions.forEach((unsubscribe: () => void) => unsubscribe())
      }
    }
  }
}
