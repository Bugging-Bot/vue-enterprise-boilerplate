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
import { localTopics } from './LocalFunctions'
//import { logger } from '@/utils/logger'

//1. Define topic
//2. Check if publishers exist
//3. Subscribe to sensor topic
//4. Update connection status

// In OnMounted
// 1. Initialize NATS client connection
// 2. Check if connection was successful
// 3. Subscribe to topics
// 4. Store unsubscribe functions for cleanup

// NATS configuration
const natsConfig: NatsConnectionConfig = {
  servers: 'wss://localhost:8181',
  user: 'sys_user',
  pass: 'Sys_P@ss',
  timeout: 5000, // 5 seconds connection timeout
  pingInterval: 30000, // 30 seconds ping interval
  reconnect: true,
  maxReconnectAttempts: 5
}

// Reactive data for UI display
// const temperature = ref<string>('--')
// const current = ref<string>('--')

// how to make below function async?
export async function localSubscriber(): Promise<void> {
  try {
    // step 1: Initialize NATS client connection
    const client = await initNatsClient(natsConfig)
    // step 2: Check if connection was successful
    if (!client || !isConnected()) {
      console.error('Failed to connect to NATS server')
      return
    }
    // step 3: Subscribe to topics [ **** Add your topics here **** ]

    void (await subscribeToTopic(
      localTopics.temperature,
      (msg: string) => {
        console.log('Temperature in Oven:', msg)
        localTopics.temperature = msg
      }
      // {
      //   timeout: 5000,
      //   retryInterval: 2000,
      //   maxRetries: 3
      // }
    ))
    void (await subscribeToTopic(
      localTopics.current,
      (msg: string) => {
        console.log('Current in Oven:', msg)
        localTopics.current = msg
      }
      // {
      //   timeout: 5000,
      //   retryInterval: 2000,
      //   maxRetries: 3
      // }
    ))

    // check if subscription is successful (how to do this?)
  } catch (error) {
    console.error('Error setting up NATS subscriptions:', error)
  }
}

// In OnUnMounted
// Clean up all subscriptions when component is unmounted

// Store subscription cleanup functions
const unsubscribeFunctions: (() => void)[] = []

export async function localCleanup(): Promise<void> {
  // Clean up individual subscriptions
  unsubscribeFunctions.forEach((unsubscribe) => unsubscribe())
  cleanupAllSubscriptions()
}
