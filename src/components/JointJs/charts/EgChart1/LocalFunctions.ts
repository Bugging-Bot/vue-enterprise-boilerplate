// this contain local function for egchart1

import factoryConfig from '@/components/JointJs/shapes/factory_config.json'
import {
  //getSensorValueColor,
  getSensorTopic
} from '@/components/JointJs/composables/chartConfiguration'
import { isConnected } from '@/components/nats/natsSubscriberService'
import { logger } from '@/utils/logger'

const factory_setup = {
  factory_id: 1,
  production_line_id: 1,
  machine_id: 1,
  sensor_id: 1
}

export const localTopics = {
  temperature: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Temperature'
  ),
  current: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Current'
  ),
  gas: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Gas'
  ),
  flow: getSensorTopic(
    factory_setup.factory_id,
    factory_setup.production_line_id,
    factory_setup.machine_id,
    factory_setup.sensor_id,
    'Flow'
  )
}

// Define color constants
const OPERATIONAL_COLOR = '#00FF00' // Green
const WARNING_COLOR = '#FFFF00' // Yellow
const ERROR_COLOR = '#FFA500' // Orange
const DANGER_COLOR = '#FF0000' // Red
const DEFAULT_COLOR = '#CCCCCC' // Gray for unknown values

/**
 * Generic function to get color for any sensor type based on its value
 * @param sensorType - The type of sensor (e.g., 'Temperature', 'Current')
 * @param value - The sensor value to evaluate
 * @returns The color corresponding to the value's range
 */
export function getSensorColor(sensorType: string, value: number | string): string {
  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  // Handle NaN or invalid values
  if (isNaN(numValue)) {
    return DEFAULT_COLOR
  }

  // Find the sensor configuration in factory_config.json
  const factories = factoryConfig.factories
  const sensor = factories[0]?.production_lines[0]?.machines[0]?.sensors.find(
    (s) => s.sensor === sensorType
  )

  if (!sensor) {
    console.warn(`${sensorType} sensor configuration not found`)
    return DEFAULT_COLOR
  }

  // Check ranges in order of priority (danger > error > warning > operational)
  if (sensor.danger_range) {
    for (const range of sensor.danger_range) {
      if (numValue >= range.min && numValue <= range.max) {
        return DANGER_COLOR
      }
    }
  }

  if (sensor.error_range) {
    for (const range of sensor.error_range) {
      if (numValue >= range.min && numValue <= range.max) {
        return ERROR_COLOR
      }
    }
  }

  if (sensor.warning_range) {
    for (const range of sensor.warning_range) {
      if (numValue >= range.min && numValue <= range.max) {
        return WARNING_COLOR
      }
    }
  }

  if (sensor.operational_range) {
    for (const range of sensor.operational_range) {
      if (numValue >= range.min && numValue <= range.max) {
        return OPERATIONAL_COLOR
      }
    }
  }

  // If not in any defined range but within overall range
  if (sensor.range && numValue >= sensor.range.min && numValue <= sensor.range.max) {
    return DEFAULT_COLOR
  }

  // Out of all ranges
  return DEFAULT_COLOR
}

/*
 * Function to get connection status
 */
// Add these to the existing exports
export const CONNECTION_STATES = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  RETRYING: 'retrying'
}

export const CONNECTION_COLORS = {
  [CONNECTION_STATES.CONNECTED]: '#4CAF50', // Green
  [CONNECTION_STATES.DISCONNECTED]: '#F44336', // Red
  [CONNECTION_STATES.CONNECTING]: '#FFC107', // Yellow
  [CONNECTION_STATES.RETRYING]: '#FFC107' // Yellow
}

export const CONNECTION_TITLES = {
  [CONNECTION_STATES.CONNECTED]: 'Connected to NATS server',
  [CONNECTION_STATES.DISCONNECTED]: 'Disconnected from NATS server',
  [CONNECTION_STATES.CONNECTING]: 'Connecting to NATS server',
  [CONNECTION_STATES.RETRYING]: 'Retrying connection to NATS server'
}

// Current connection status
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
