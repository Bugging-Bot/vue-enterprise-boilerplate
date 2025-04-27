/**
 * Represents a numeric range with minimum and maximum values.
 */

import * as color from './colorCodes'
import { subscribeToTopic } from '@/components/nats/natsSubscriberService'

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
  subscribe(callback: (sensor: RawSensor) => void) {
    subscribeToTopic(this.topic, (msg: string) => {
      const reading = parseFloat(msg)
      if (!isNaN(reading)) {
        this.latestReading = reading
        callback(this) // Notify machine
      }
    })
  }

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
   * Determines the color based on the sensor value's position in different ranges.
   * Checks ranges in order of severity: danger, error, warning, operational.
   * Returns a color corresponding to the first matching range.
   *
   * @param value - The numeric value to evaluate against sensor ranges
   * @returns A color string representing the sensor's current status
   */
  getColor(value: number): string {
    // Check for danger range
    if (this.danger_range.some((range) => isInRange(value, range))) {
      return color.DEFAULT_COLOR
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
}
