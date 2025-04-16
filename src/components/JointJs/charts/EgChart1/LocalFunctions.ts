// this contain local function for egchart1

import factoryConfig from '@/components/JointJs/shapes/factory_config.json'
import {
  //getSensorValueColor,
  getSensorTopic
} from '@/components/JointJs/composables/chartConfiguration'

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
