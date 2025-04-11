import { connect, StringCodec } from 'nats.ws'
import type { NatsConnection } from 'nats.ws'

// NATS configuration interface
export interface NATSConfig {
  serverUrl: string
  username: string
  password: string
}

// Message handler type
// Defines the shape of the configuration object needed to connect to NATS.
// Defines a type for the function that handles received messages.
export type MessageHandler = (topic: string, message: string) => void

// Subscription tracking
// Used to keep track of what each "element" (e.g., component) is subscribed to. The key is the element ID, and the value is an array of subscriptions or interval IDs.
interface SubscriptionTracker {
  [id: string]: any[]
}

// natsConnection: A shared connection to the NATS server, created once.
let natsConnection: NatsConnection | null = null
// subscriptions: Stores what each element is subscribed to so we can unsubscribe later.
const subscriptions: SubscriptionTracker = {}

/**
 * Subscribe to multiple topics for a specific element
 * @param config - NATS configuration
 * @param elementId - ID of the element subscribing to topics
 * @param topics - Array of topics to subscribe to
 * @param messageHandler - Function to handle received messages
 */
export async function subscribeToTopics(
  config: NATSConfig,
  elementId: string,
  topics: string[],
  messageHandler: MessageHandler
): Promise<void> {
  // Avoids doing anything if no topics are given.
  if (topics.length === 0) {
    console.error('No topics specified for element', elementId)
    return
  }

  // Initialize subscriptions array for this element
  // Prepare to track subscriptions, Initializes a list to store this element's subscriptions.
  subscriptions[elementId] = []

  try {
    // For browser development, use a mock implementation
    // This block fakes data in development mode (like when testing in the browser):
    // Simulates receiving random data every 3 seconds per topic.
    // Calls messageHandler(topic, message) with fake data.
    // if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    //   console.log(
    //     `Simulating subscription to topics: ${topics.join(', ')} for element ${elementId}`
    //   )

    //   // Simulate receiving data updates every 3 seconds for each topic
    //   topics.forEach((topic: string) => {
    //     const simulateDataUpdates = () => {
    //       // Generate random values between 5 and 55
    //       const randomValue = Math.floor(Math.random() * 50) + 5
    //       console.log(
    //         `Received simulated data: ${randomValue} for topic: ${topic}, element: ${elementId}`
    //       )
    //       messageHandler(topic, randomValue.toString())
    //     }

    //     // Initial update
    //     simulateDataUpdates()

    //     // Set interval for updates
    //     const intervalId = setInterval(simulateDataUpdates, 3000)

    //     // Store interval ID for cleanup
    //     subscriptions[elementId].push(intervalId)
    //   })

    //   return
    // }

    // For production or if we can connect to NATS
    // Connect to the NATS server with authentication if not already connected
    if (!natsConnection) {
      natsConnection = await connect({
        servers: [config.serverUrl],
        user: config.username,
        pass: config.password
      })
    }

    // Create a StringCodec to decode the messages
    const sc = StringCodec()

    // Subscribe to each topic
    for (const topic of topics) {
      const sub = natsConnection.subscribe(topic)

      // Store subscription for cleanup
      subscriptions[elementId].push(sub)

      console.log(`Subscribed to topic: ${topic} for element ${elementId}`)

      // Process messages in the background
      ;(async () => {
        for await (const msg of sub) {
          // Decode the message
          const message = sc.decode(msg.data)
          console.log(`Received message: ${message} for topic: ${topic}, element: ${elementId}`)

          // Handle the message based on topic
          messageHandler(topic, message)
        }
      })()
    }
  } catch (error) {
    console.error(`Error connecting to NATS or subscribing for element ${elementId}:`, error)

    // Fall back to simulation in case of error
    if (typeof window !== 'undefined') {
      console.log(`Falling back to simulated data for element ${elementId}`)

      // Simulate receiving data updates for each topic
      topics.forEach((topic: string) => {
        const simulateDataUpdates = () => {
          // Generate random values between 5 and 55
          const randomValue = Math.floor(Math.random() * 50) + 5
          console.log(
            `Received simulated data: ${randomValue} for topic: ${topic}, element: ${elementId}`
          )
          messageHandler(topic, randomValue.toString())
        }

        // Initial update
        simulateDataUpdates()

        // Set interval for updates
        const intervalId = setInterval(simulateDataUpdates, 3000)

        // Store interval ID for cleanup
        subscriptions[elementId].push(intervalId)
      })
    }
  }
}

/**
 * Unsubscribe from all topics for a specific element
 * @param elementId - ID of the element to unsubscribe
 */
export function unsubscribeElement(elementId: string): void {
  if (subscriptions[elementId]) {
    subscriptions[elementId].forEach((subscription) => {
      if (typeof subscription === 'number') {
        // It's an interval ID
        clearInterval(subscription)
      } else if (subscription && typeof subscription.unsubscribe === 'function') {
        // It's a NATS subscription
        subscription.unsubscribe()
      }
    })

    // Remove from tracking
    delete subscriptions[elementId]
  }
}

/**
 * Unsubscribe all elements and close connection
 */
export function cleanupAllSubscriptions(): void {
  // Clean up all subscriptions
  for (const id in subscriptions) {
    unsubscribeElement(id)
  }

  // Close NATS connection if it exists
  if (natsConnection) {
    natsConnection.close()
    natsConnection = null
  }
}
