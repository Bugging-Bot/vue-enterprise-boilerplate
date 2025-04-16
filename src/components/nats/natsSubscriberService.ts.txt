import { connect, StringCodec } from 'nats.ws'
import type { NatsConnection } from 'nats.ws'
//import type { dia } from 'jointjs' // Importing JointJS types
// Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0 to ignore TLS errors
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// NATS configuration interface
export interface NATSConfig {
  serverUrl: string
  username: string
  password: string
}

// Message handler type
// Defines a type for the function that handles received messages.
export type MessageHandler = (topic: string, message: string) => void

// Subscription tracking
// Used to keep track of what each "element" (e.g., component) is subscribed to. The key is the element ID, and the value is an array of subscriptions or interval IDs.
interface SubscriptionTracker {
  [id: string]: any[] // Track subscriptions for each element
}

// natsConnection: A shared connection to the NATS server, created once.
let natsConnection: NatsConnection | null = null
// subscriptions: Stores what each element is subscribed to so we can unsubscribe later.
const subscriptions: SubscriptionTracker = {}

/**
 * Subscribe to multiple topics for a specific element
 * @param config - NATS configuration
 * @param elementId - ID of the element subscribing to topics (joint.dia.Element.id)
 * @param topics - Array of topics to subscribe to
 * @param messageHandler - Function to handle received messages, messages will be passed to this function.
 */
export async function subscribeToTopics(
  config: NATSConfig,
  elementId: string, // Element ID will be from joint.dia.Element.id
  topics: string[],
  messageHandler: MessageHandler
): Promise<void> {
  // Avoid doing anything if no topics are given.
  if (topics.length === 0) {
    console.error('No topics specified for element', elementId)
    return
  }

  // Print configuration for connection
  console.log('NATS configuration:', config)

  // Initialize subscriptions array for this element, prepare to track subscriptions.
  subscriptions[elementId] = []

  try {
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
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
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
