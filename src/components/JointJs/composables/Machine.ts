import { RawSensor } from './Sensor'
import * as color from './colorCodes'

export interface RawMachineConfig {
  machines: RawMachine[]
}

export class RawMachine {
  constructor(
    public machine_id: number,
    public metadata: any, // metadata is of any type
    public sensors: RawSensor[] // list of sensors
  ) {}

  // get machine id
  getId(): number {
    return this.machine_id
  }
  // get metadata
  getMetadata(): any {
    return this.metadata
  }
  // Get list of sensors on this machine
  getSensors(): RawSensor[] {
    return this.sensors
  }
  // Get sensor by ID
  getSensorById(id: number): RawSensor | undefined {
    return this.sensors.find((s) => s.id === id)
  }
  // Subscribe to all sensors
  subscribeToSensors(onColorChange: (machineId: number, color: string) => void) {
    for (const sensor of this.getSensors()) {
      sensor.subscribe(() => {
        const color = this.getColorFromReadings()
        onColorChange(this.getId(), color)
      })
    }
  }
  // Build current readings object
  private getColorFromReadings(): string {
    const sensorReadings: Record<string, number> = {}
    for (const sensor of this.getSensors()) {
      const reading = sensor.getLatestReading()
      if (reading !== null) {
        sensorReadings[sensor.getTopic()] = reading
      }
    }
    return this.getColor(sensorReadings)
  }

  // function to get the color based on the sensor data.
  // Existing getColor(sensorReadings) must support Record<string, number>
  getColor(sensorReadings: Record<string, number>): string {
    let newcolor = color.OPERATIONAL_COLOR

    for (const sensor of this.getSensors()) {
      const value = sensorReadings[sensor.getTopic()]
      if (value === undefined) continue

      if (sensor.danger_range.some((r) => value >= r.min && value <= r.max)) {
        return color.DANGER_COLOR
      }
      if (sensor.error_range.some((r) => value >= r.min && value <= r.max)) {
        newcolor = color.ERROR_COLOR
      } else if (sensor.warning_range.some((r) => value >= r.min && value <= r.max)) {
        if (newcolor !== color.ERROR_COLOR) newcolor = color.WARNING_COLOR
      }
    }

    return newcolor
  }
}
