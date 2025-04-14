import { connect } from 'nats.ws'
import type { NatsConnection, Subscription, ConnectionOptions } from 'nats.ws'

let nc: NatsConnection | null = null
let connectionAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_DELAY_MS = 2000

// Store active subscriptions for cleanup
const activeSubscriptions: Map<string, Subscription> = new Map()

export interface NatsConnectionConfig {
  servers: string | string[]
  user: string
  pass: string
  timeout?: number
  pingInterval?: number
  reconnect?: boolean
  maxReconnectAttempts?: number
}

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

export function isConnected(): boolean {
  return nc !== null && !nc.isClosed()
}
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
