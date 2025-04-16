/**
 * Unit tests for LocalSubscriber module
 *
 * These tests verify the functionality of the LocalSubscriber module,
 * including connection handling, subscription management, and cleanup.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  localSubscriber,
  localCleanup,
  subscribeToLocalTopic,
  unsubscribeFromTopic,
  getConnectionStatus,
  getActiveSubscriptions,
  natsConfig,
  DEFAULT_TIMEOUT,
  DEFAULT_RETRY_INTERVAL,
  DEFAULT_MAX_RETRIES
} from '../EgChart1/LocalSubscriber'

import {
  initNatsClient,
  subscribeToTopic,
  isConnected,
  cleanupAllSubscriptions,
  checkPublisherExists
} from '@/components/nats/natsSubscriberService'
import { localTopics } from '../EgChart1/LocalFunctions'
import { logger } from '@/utils/logger'

// Mock the natsSubscriberService
vi.mock('@/components/nats/natsSubscriberService', () => ({
  initNatsClient: vi.fn(),
  subscribeToTopic: vi.fn(),
  isConnected: vi.fn(),
  cleanupAllSubscriptions: vi.fn(),
  checkPublisherExists: vi.fn()
}))

// Mock the logger
vi.mock('@/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}))

// Mock the window.dispatchEvent
const mockDispatchEvent = vi.fn()
global.window.dispatchEvent = mockDispatchEvent

describe('LocalSubscriber', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks()
  })

  afterEach(async () => {
    // Clean up after each test
    await localCleanup()
  })

  describe('localSubscriber', () => {
    it('should successfully connect and subscribe to topics', async () => {
      // Mock successful connection
      const mockClient = { connected: true }
      vi.mocked(initNatsClient).mockResolvedValue(mockClient as any)
      vi.mocked(isConnected).mockReturnValue(true)
      vi.mocked(checkPublisherExists).mockResolvedValue(true)

      // Mock successful subscription
      const mockUnsubscribe = vi.fn()
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      // Call the function
      const result = await localSubscriber()

      // Verify results
      expect(result.success).toBe(true)
      expect(result.connectionStatus).toBe('connected')
      expect(result.subscriptions.length).toBe(2)
      expect(result.subscriptions[0].success).toBe(true)

      // Verify the correct functions were called
      expect(initNatsClient).toHaveBeenCalledWith(natsConfig)
      expect(subscribeToTopic).toHaveBeenCalledTimes(2)
      expect(logger.info).toHaveBeenCalledWith('Successfully connected to NATS server')
    })

    it('should handle connection failure', async () => {
      // Mock failed connection
      vi.mocked(initNatsClient).mockResolvedValue(null)
      vi.mocked(isConnected).mockReturnValue(false)

      // Call the function
      const result = await localSubscriber()

      // Verify results
      expect(result.success).toBe(false)
      expect(result.connectionStatus).toBe('disconnected')
      expect(result.subscriptions).toEqual([])
      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe('Failed to connect to NATS server')

      // Verify the correct functions were called
      expect(initNatsClient).toHaveBeenCalledWith(natsConfig)
      expect(subscribeToTopic).not.toHaveBeenCalled()
      expect(logger.error).toHaveBeenCalledWith('Failed to connect to NATS server')
    })

    it('should handle subscription failures', async () => {
      // Mock successful connection but failed subscription
      const mockClient = { connected: true }
      vi.mocked(initNatsClient).mockResolvedValue(mockClient as any)
      vi.mocked(isConnected).mockReturnValue(true)
      vi.mocked(checkPublisherExists).mockResolvedValue(false)

      // Mock failed subscription
      const subscriptionError = new Error('Subscription failed')
      vi.mocked(subscribeToTopic).mockRejectedValue(subscriptionError)

      // Call the function
      const result = await localSubscriber()

      // Verify results
      expect(result.success).toBe(false)
      expect(result.connectionStatus).toBe('connected')
      expect(result.subscriptions.length).toBe(2)
      expect(result.subscriptions[0].success).toBe(false)
      expect(result.subscriptions[0].error).toBeDefined()

      // Verify the correct functions were called
      expect(initNatsClient).toHaveBeenCalledWith(natsConfig)
      expect(subscribeToTopic).toHaveBeenCalledTimes(2)
      expect(logger.error).toHaveBeenCalled()
    })

    it('should handle unexpected errors', async () => {
      // Mock an unexpected error
      const unexpectedError = new Error('Unexpected error')
      vi.mocked(initNatsClient).mockRejectedValue(unexpectedError)

      // Call the function
      const result = await localSubscriber()

      // Verify results
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe('Unexpected error')

      // Verify the correct functions were called
      expect(initNatsClient).toHaveBeenCalledWith(natsConfig)
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('subscribeToLocalTopic', () => {
    it('should successfully subscribe to a topic', async () => {
      // Mock successful subscription
      const mockUnsubscribe = vi.fn()
      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      // Mock message handler
      const mockHandler = vi.fn()

      // Call the function
      const result = await subscribeToLocalTopic('test.topic', mockHandler)

      // Verify results
      expect(result.success).toBe(true)
      expect(result.topic).toBe('test.topic')
      expect(result.error).toBeUndefined()

      // Verify the correct functions were called
      expect(checkPublisherExists).toHaveBeenCalledWith('test.topic')
      expect(subscribeToTopic).toHaveBeenCalledWith('test.topic', expect.any(Function), {
        timeout: DEFAULT_TIMEOUT,
        retryInterval: DEFAULT_RETRY_INTERVAL,
        maxRetries: DEFAULT_MAX_RETRIES
      })
      expect(logger.info).toHaveBeenCalledWith('Successfully subscribed to topic: test.topic')
    })

    it('should handle subscription failure', async () => {
      // Mock failed subscription
      const subscriptionError = new Error('Subscription failed')
      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockRejectedValue(subscriptionError)

      // Mock message handler
      const mockHandler = vi.fn()

      // Call the function
      const result = await subscribeToLocalTopic('test.topic', mockHandler)

      // Verify results
      expect(result.success).toBe(false)
      expect(result.topic).toBe('test.topic')
      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe('Subscription failed')

      // Verify the correct functions were called
      expect(checkPublisherExists).toHaveBeenCalledWith('test.topic')
      expect(subscribeToTopic).toHaveBeenCalled()
      expect(logger.error).toHaveBeenCalled()
    })

    it('should continue even if no publisher is found', async () => {
      // Mock no publisher found but successful subscription
      vi.mocked(checkPublisherExists).mockResolvedValue(false)
      const mockUnsubscribe = vi.fn()
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      // Mock message handler
      const mockHandler = vi.fn()

      // Call the function
      const result = await subscribeToLocalTopic('test.topic', mockHandler)

      // Verify results
      expect(result.success).toBe(true)
      expect(result.topic).toBe('test.topic')

      // Verify the correct functions were called
      expect(checkPublisherExists).toHaveBeenCalledWith('test.topic')
      expect(logger.warn).toHaveBeenCalledWith('No publisher found for topic: test.topic')
      expect(subscribeToTopic).toHaveBeenCalled()
    })

    it('should call the message handler when a message is received', async () => {
      // Mock successful subscription
      const mockUnsubscribe = vi.fn()
      let messageCallback: Function = () => {}

      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockImplementation((topic, callback, options) => {
        messageCallback = callback as Function
        return Promise.resolve({
          subscription: {} as any,
          unsubscribe: mockUnsubscribe
        })
      })

      // Mock message handler
      const mockHandler = vi.fn()

      // Call the function
      await subscribeToLocalTopic('test.topic', mockHandler)

      // Simulate receiving a message
      messageCallback('test message')

      // Verify the handler was called with the message
      expect(mockHandler).toHaveBeenCalledWith('test message')
      expect(logger.debug).toHaveBeenCalledWith(
        'Received message on topic test.topic: test message'
      )
    })
  })

  describe('unsubscribeFromTopic', () => {
    it('should successfully unsubscribe from a topic', async () => {
      // First subscribe to a topic
      const mockUnsubscribe = vi.fn()
      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      await subscribeToLocalTopic('test.topic', () => {})

      // Reset mocks for clean test
      vi.clearAllMocks()

      // Now unsubscribe
      const result = unsubscribeFromTopic('test.topic')

      // Verify results
      expect(result).toBe(true)
      expect(mockUnsubscribe).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalledWith('Successfully unsubscribed from topic: test.topic')
    })

    it('should handle unsubscribe from non-existent topic', () => {
      // Try to unsubscribe from a topic that doesn't exist
      const result = unsubscribeFromTopic('non-existent.topic')

      // Verify results
      expect(result).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'No active subscription found for topic: non-existent.topic'
      )
    })

    it('should handle errors during unsubscribe', async () => {
      // First subscribe to a topic
      const mockUnsubscribe = vi.fn().mockImplementation(() => {
        throw new Error('Unsubscribe error')
      })

      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      await subscribeToLocalTopic('test.topic', () => {})

      // Reset mocks for clean test
      vi.clearAllMocks()

      // Now unsubscribe
      const result = unsubscribeFromTopic('test.topic')

      // Verify results
      expect(result).toBe(false)
      expect(mockUnsubscribe).toHaveBeenCalled()
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('localCleanup', () => {
    it('should clean up all subscriptions', async () => {
      // Set up multiple subscriptions
      const mockUnsubscribe1 = vi.fn()
      const mockUnsubscribe2 = vi.fn()

      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic)
        .mockImplementationOnce(() => {
          return Promise.resolve({
            subscription: {} as any,
            unsubscribe: mockUnsubscribe1
          })
        })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            subscription: {} as any,
            unsubscribe: mockUnsubscribe2
          })
        })

      await subscribeToLocalTopic('topic1', () => {})
      await subscribeToLocalTopic('topic2', () => {})

      // Reset mocks for clean test
      vi.clearAllMocks()

      // Now clean up
      const result = await localCleanup()

      // Verify results
      expect(result).toBe(true)
      expect(mockUnsubscribe1).toHaveBeenCalled()
      expect(mockUnsubscribe2).toHaveBeenCalled()
      expect(cleanupAllSubscriptions).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalledWith('NATS cleanup completed successfully')
    })

    it('should handle errors during cleanup', async () => {
      // Set up a subscription with a cleanup that throws an error
      const mockUnsubscribe = vi.fn().mockImplementation(() => {
        throw new Error('Unsubscribe error')
      })

      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      await subscribeToLocalTopic('test.topic', () => {})

      // Reset mocks for clean test
      vi.clearAllMocks()

      // Mock cleanupAllSubscriptions to throw an error
      vi.mocked(cleanupAllSubscriptions).mockImplementation(() => {
        throw new Error('Cleanup service error')
      })

      // Now clean up
      const result = await localCleanup()

      // Verify results
      expect(result).toBe(false)
      expect(mockUnsubscribe).toHaveBeenCalled()
      expect(cleanupAllSubscriptions).toHaveBeenCalled()
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('getConnectionStatus', () => {
    it('should return connected when connected', () => {
      // Mock connected state
      vi.mocked(isConnected).mockReturnValue(true)

      // Get status
      const status = getConnectionStatus()

      // Verify result
      expect(status).toBe('connected')
    })

    it('should return disconnected when not connected', () => {
      // Mock disconnected state
      vi.mocked(isConnected).mockReturnValue(false)

      // Get status
      const status = getConnectionStatus()

      // Verify result
      expect(status).toBe('disconnected')
    })
  })

  describe('getActiveSubscriptions', () => {
    it('should return all active subscription topics', async () => {
      // Set up multiple subscriptions
      const mockUnsubscribe = vi.fn()

      vi.mocked(checkPublisherExists).mockResolvedValue(true)
      vi.mocked(subscribeToTopic).mockResolvedValue({
        subscription: {} as any,
        unsubscribe: mockUnsubscribe
      })

      // Subscribe to multiple topics
      await subscribeToLocalTopic('topic1', () => {})
      await subscribeToLocalTopic('topic2', () => {})

      // Get active subscriptions
      const activeSubscriptions = getActiveSubscriptions()

      // Verify results
      expect(activeSubscriptions).toContain('topic1')
      expect(activeSubscriptions).toContain('topic2')
      expect(activeSubscriptions.length).toBe(2)
    })

    it('should return empty array when no subscriptions are active', () => {
      // Get active subscriptions when none exist
      const activeSubscriptions = getActiveSubscriptions()

      // Verify results
      expect(activeSubscriptions).toEqual([])
    })
  })

  describe('Integration tests', () => {
    it('should handle the full subscription lifecycle', async () => {
      // Mock successful connection
      const mockClient = { connected: true }
      vi.mocked(initNatsClient).mockResolvedValue(mockClient as any)
      vi.mocked(isConnected).mockReturnValue(true)
      vi.mocked(checkPublisherExists).mockResolvedValue(true)

      // Mock successful subscription
      const mockUnsubscribe1 = vi.fn()
      const mockUnsubscribe2 = vi.fn()

      vi.mocked(subscribeToTopic)
        .mockImplementationOnce(() => {
          return Promise.resolve({
            subscription: {} as any,
            unsubscribe: mockUnsubscribe1
          })
        })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            subscription: {} as any,
            unsubscribe: mockUnsubscribe2
          })
        })

      // 1. Initialize and subscribe
      const result = await localSubscriber()

      // Verify successful initialization
      expect(result.success).toBe(true)
      expect(result.connectionStatus).toBe('connected')
      expect(result.subscriptions.length).toBe(2)

      // 2. Check active subscriptions
      const activeSubscriptions = getActiveSubscriptions()
      expect(activeSubscriptions).toContain(localTopics.temperature)
      expect(activeSubscriptions).toContain(localTopics.current)

      // 3. Unsubscribe from one topic
      const unsubscribeResult = unsubscribeFromTopic(localTopics.temperature)
      expect(unsubscribeResult).toBe(true)
      expect(mockUnsubscribe1).toHaveBeenCalled()

      // 4. Check remaining subscriptions
      const remainingSubscriptions = getActiveSubscriptions()
      expect(remainingSubscriptions).not.toContain(localTopics.temperature)
      expect(remainingSubscriptions).toContain(localTopics.current)
      expect(remainingSubscriptions.length).toBe(1)

      // 5. Clean up all subscriptions
      const cleanupResult = await localCleanup()
      expect(cleanupResult).toBe(true)
      expect(mockUnsubscribe2).toHaveBeenCalled()
      expect(cleanupAllSubscriptions).toHaveBeenCalled()

      // 6. Verify no active subscriptions remain
      const finalSubscriptions = getActiveSubscriptions()
      expect(finalSubscriptions).toEqual([])
    })
  })
})
