import factoryConfig from '@/components/JointJs/shapes/factory_config.json'

// Function to get sensor configuration from factory_config.json
export function getSensorConfig(sensorCode: string) {
  // Find the sensor in the factory configuration
  const factories = factoryConfig.factories || []

  for (const factory of factories) {
    for (const productionLine of factory.production_lines || []) {
      for (const machine of productionLine.machines || []) {
        for (const sensor of machine.sensors || []) {
          if (sensor.code === sensorCode) {
            return sensor
          }
        }
      }
    }
  }

  return null
}

// Function to determine color based on sensor value and ranges
export function getSensorValueColor(sensorCode: string, value: string): string {
  // Default color for inactive or invalid values
  if (value === '--' || isNaN(parseFloat(value))) {
    return '#808080' // Gray for inactive
  }

  const numericValue = parseFloat(value)
  const sensorConfig = getSensorConfig(sensorCode)

  if (!sensorConfig || !sensorConfig.range) {
    return '#808080' // Gray if no configuration found
  }

  // Check operational range
  if (sensorConfig.operational_range) {
    for (const range of sensorConfig.operational_range) {
      if (numericValue >= range.min && numericValue <= range.max) {
        return '#008000' // Green for operational
      }
    }
  }

  // Check warning range
  if (sensorConfig.warning_range) {
    for (const range of sensorConfig.warning_range) {
      if (numericValue >= range.min && numericValue <= range.max) {
        return '#FFD700' // Gold for warning
      }
    }
  }

  // Check error range
  if (sensorConfig.error_range) {
    for (const range of sensorConfig.error_range) {
      if (numericValue >= range.min && numericValue <= range.max) {
        return '#FF0000' // Red for error
      }
    }
  }

  // Check danger range (optional, using red as well)
  if (sensorConfig.danger_range) {
    for (const range of sensorConfig.danger_range) {
      if (numericValue >= range.min && numericValue <= range.max) {
        return '#FF0000' // Red for danger
      }
    }
  }

  return '#808080' // Default to gray if not in any defined range
}

// Function to get sensor topic from configuration
// Function to get sensor topic from configuration based on IDs
export function getSensorTopic(
  factoryId: number,
  productionLineId: number,
  machineId: number,
  sensorName: string
): string {
  // Find the sensor in the factory configuration
  const factories = factoryConfig.factories || []

  // Find the specific factory
  const factory = factories.find((f) => f.factory_id === factoryId)
  if (!factory) return ''

  // Find the specific production line
  const productionLine = factory.production_lines?.find(
    (p) => p.production_line_id === productionLineId
  )
  if (!productionLine) return ''

  // Find the specific machine
  const machine = productionLine.machines?.find((m) => m.machine_id === machineId)
  if (!machine) return ''

  // Find the specific sensor
  const sensor = machine.sensors?.find((s) => s.sensor === sensorName)
  if (!sensor || !sensor.topic) return ''

  return sensor.topic
}
