// Current connection status
import {
  CONNECTION_STATES,
  CONNECTION_COLORS,
  CONNECTION_TITLES
} from '@/components/JointJs/composables/colorCodes'
import { logger } from '@/utils/logger'
import { isConnected } from '@/components/nats/natsSubscriberService'

let currentConnectionStatus = CONNECTION_STATES.DISCONNECTED

/**
 * Update the connection status
 * @param status New connection status
 */

export function updateConnectionStatus(status: string): void {
  if (currentConnectionStatus !== status) {
    currentConnectionStatus = status
    logger.debug(`NATS connection status changed to: ${status}`)
  }
}

/**
 * Gets the current connection status
 * @returns The current connection status
 */

export function checkNATSConnectionStatus(): string {
  // Check actual connection and update status if needed
  if (isConnected()) {
    if (currentConnectionStatus !== CONNECTION_STATES.CONNECTED) {
      updateConnectionStatus(CONNECTION_STATES.CONNECTED)
    }
  } else if (currentConnectionStatus === CONNECTION_STATES.CONNECTED) {
    updateConnectionStatus(CONNECTION_STATES.DISCONNECTED)
  }

  return currentConnectionStatus
}

/**
 * Gets the title for the current connection status
 * @param status Connection status
 * @returns The title for the status
 */

export function checkNATSConnectionStatusTitle(status: string): string {
  return CONNECTION_TITLES[status] || 'NATS Connection Status'
}

/**
 * Gets the color for the current connection status
 * @param status Connection status
 * @returns The color for the status
 */

export function checkNATSConnectionStatusColor(status: string): string {
  return CONNECTION_COLORS[status] || '#CCCCCC' // Default gray
}

/**
 * Creates a reusable connection status indicator component
 * @param container The container element to append the indicator to
 * @returns Object with methods to update and remove the indicator
 */

export function createConnectionIndicator(container: HTMLElement) {
  // Create the indicator element
  const indicator = document.createElement('div')
  indicator.className = 'connection-status'
  indicator.style.position = 'absolute'
  indicator.style.top = '10px'
  indicator.style.left = '10px' // for making right aligned => indicator.style.right = '10px'
  indicator.style.zIndex = '1000'
  indicator.style.width = '12px'
  indicator.style.height = '12px'
  indicator.style.borderRadius = '50%'
  indicator.style.border = '1px solid #333'

  // Add to container
  container.appendChild(indicator)

  // Update the indicator with initial status
  updateIndicator(checkNATSConnectionStatus())

  // Function to update the indicator
  function updateIndicator(status: string) {
    indicator.style.backgroundColor = checkNATSConnectionStatusColor(status)
    indicator.title = checkNATSConnectionStatusTitle(status)
  }

  // Start periodic status check
  const intervalId = setInterval(() => {
    updateIndicator(checkNATSConnectionStatus())
  }, 2000)

  // Return methods to control the indicator
  return {
    update: updateIndicator,
    remove: () => {
      clearInterval(intervalId)
      if (container.contains(indicator)) {
        container.removeChild(indicator)
      }
    }
  }
}

