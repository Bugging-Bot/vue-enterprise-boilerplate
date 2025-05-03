/**
 * Represents a numeric range with minimum and maximum values.
 */

import * as color from './colorCodes'
import { subscribeToTopic } from '@/components/nats/natsSubscriberService'
import { logger } from '@/utils/logger'

export interface RawSensorConfig {
  sensors: RawSensor[]
}

export interface RawRange {
  min: number
  max: number
}

export type RawAccuracy = 'absolute' | 'relative'
export interface Accuracy {
  type: RawAccuracy
  value: number
  unit: string
}

// Add a method to check if a value is within a range
function isInRange(value: number, range: RawRange): boolean {
  return value >= range.min && value <= range.max
}

export class RawSensor {
  private latestReading: number | null = null
  constructor(
    public id: number,
    public sensor: string,
    public code: string,
    public unit: string,
    public measure: string,
    public topic: string,
    public range: RawRange,
    public operational_range: RawRange[],
    public warning_range: RawRange[],
    public error_range: RawRange[],
    public danger_range: RawRange[],
    public reading: number,
    public accuracy?: Accuracy
  ) {}

  // get id
  getId(): number {
    return this.id
  }
  // get sensor name
  getName(): string {
    return this.sensor
  }
  // to get the topic name
  getTopic(): string {
    return this.topic
  }
  // get latest readings
  getLatestReading(): number | null {
    return this.latestReading
  }

  // NEW: Subscribe to this sensor’s topic
  /**
   * Subscribes to the sensor's topic and calls a provided callback with the updated sensor when a new reading is received.
   *
   * @param callback - A function to be called when a new sensor reading is successfully parsed, receiving the updated sensor as an argument
   */
  subscribe(callback: (sensor: RawSensor) => void) {
    subscribeToTopic(this.topic, (msg: string) => {
      const newreading = parseFloat(msg)
      if (!isNaN(newreading)) {
        this.latestReading = newreading
        this.reading = newreading
        logger.info(`Sensor ${this.sensor} received new reading: ${newreading}`)
        callback(this) // Notify machine
      }
    })
  }

  /**
   * Subscribes to the sensor's topic and tracks updates, calling a provided callback when a new reading is received.
   *
   * @param onUpdate - A callback function to be invoked when a new sensor reading is successfully parsed
   */
  subscribeAndTrack(onUpdate: () => void) {
    subscribeToTopic(this.topic, (msg: string) => {
      const newreading = parseFloat(msg)
      if (!isNaN(newreading)) {
        this.latestReading = newreading
        this.reading = newreading
        onUpdate()
      }
    })
  }

  /**
   * Retrieves all range configurations for the sensor.
   *
   * @returns An object containing different range configurations including range, operational, warning, error, and danger ranges.
   */
  getRanges(): any {
    return {
      range: this.range,
      operational_range: this.operational_range,
      warning_range: this.warning_range,
      error_range: this.error_range,
      danger_range: this.danger_range
    }
  }

  /**
   * Determines the color based on the sensor reading's position in different ranges.
   * Checks ranges in order of severity: danger, error, warning, operational.
   * Returns a color corresponding to the first matching range.
   *
   * @param value - The numeric readings to evaluate against sensor ranges
   * @returns A color string representing the sensor's current status
   */
  getColor(value: number): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numericValue)) {
      logger.warn(`⚠️ Invalid value passed to getColor:`, value)
      return color.DEFAULT_COLOR
    }

    // Check for danger range
    if (this.danger_range.some((range) => isInRange(value, range))) {
      return color.DANGER_COLOR
    }
    // Check for error range
    if (this.error_range.some((range) => isInRange(value, range))) {
      return color.ERROR_COLOR
    }
    // Check for warning range
    if (this.warning_range.some((range) => isInRange(value, range))) {
      return color.WARNING_COLOR
    }
    // Check for operational range
    if (this.operational_range.some((range) => isInRange(value, range))) {
      return color.OPERATIONAL_COLOR
    }

    // Default if no ranges match
    return color.DEFAULT_COLOR
  }

  // get current color
  getCurrentColor(): string | null {
    if (this.reading == null || isNaN(this.reading)) return null
    return this.getColor(this.reading)
  }
}
