import { connect, StringCodec } from 'nats.ws'
// Import NatsConnection as a type-only import
import type { NatsConnection } from 'nats.ws'

interface NATSConfig {
  serverUrl: string // The NATS server URL (e.g., nats://localhost:4222)
  topic: string // Topic to subscribe to (e.g., mystream.humidity)
  username: string // NATS username (e.g., sys_user)
  password: string // NATS password (e.g., Sys_P@ss)
}

async function createNATSSubscriber(config: NATSConfig): Promise<void> {
  try {
    // Connect to the NATS server with authentication
    const nc: NatsConnection = await connect({
      servers: [config.serverUrl], // The NATS server URL (e.g., "nats://localhost:4222")
      user: config.username, // NATS username (e.g., "sys_user")
      pass: config.password // NATS password (e.g., "Sys_P@ss")
    })

    // Create a StringCodec to decode the messages
    const sc = StringCodec()

    // Subscribe to the specified topic
    const sub = nc.subscribe(config.topic)

    console.log(`Subscribed to topic: ${config.topic}`)

    // Receive messages
    for await (const msg of sub) {
      // Decode the message and log it
      const message = sc.decode(msg.data)
      console.log(`Received message: ${message}`)
    }
  } catch (error) {
    console.error('Error connecting to NATS or subscribing:', error)
  }
}

// Usage example:
const config: NATSConfig = {
  serverUrl: 'nats://localhost:4222', // NATS server URL (change to your actual server URL)
  topic: 'f.1.p.1.m.1.s.1.t', // Topic to subscribe to
  username: 'sys_user', // NATS username
  password: 'Sys_P@ss' // NATS password
}

// Create the subscriber
createNATSSubscriber(config)
