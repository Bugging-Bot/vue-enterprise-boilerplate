import { RawSensor } from './Sensor'
import * as color from './colorCodes'
import * as joint from '@joint/core'

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
  // Subscribe to all sensors' topics and track color changes
  subscribeToColorChange(onColorChange: (machineId: number, color: string) => void) {
    for (const sensor of this.getSensors()) {
      sensor.subscribe(() => {
        const newcolor = this.getColorFromReadings()
        onColorChange(this.getId(), newcolor)
      })
    }
  }
  // Build current readings object
  private getColorFromReadings(): string {
    const sensorReadings: Record<string, number> = {}
    // Collect readings from all sensors
    for (const sensor of this.getSensors()) {
      const reading = sensor.reading
      if (typeof reading === 'number' && !isNaN(reading)) {
        sensorReadings[sensor.getTopic()] = reading
      }
    }
    // ✅ Fallback if no valid readings available
    // If no valid readings, return NO_DATA_COLOR or DEFAULT_COLOR
    if (Object.keys(sensorReadings).length === 0) {
      return color.NO_DATA_COLOR ?? color.DEFAULT_COLOR // Use NO_DATA_COLOR if defined
    }
    // Determine the color based on collected readings
    return this.getColor(sensorReadings)
  }

  // function to get the color based on the sensor data.
  // Existing getColor(sensorReadings) must support Record<string, number>
  getColor(sensorReadings: Record<string, number>): string {
    let newcolor = color.OPERATIONAL_COLOR
    // Check each sensor reading to determine the machine color
    for (const sensor of this.getSensors()) {
      const value = sensorReadings[sensor.getTopic()]
      if (value === undefined) continue
      // Determine the color for this sensor's value
      const sensorColor = sensor.getColor(value)
      // Update the overall machine color based on the highest severity sensor color
      if (sensorColor === color.DANGER_COLOR) return color.DANGER_COLOR
      if (sensorColor === color.ERROR_COLOR) newcolor = color.ERROR_COLOR
      else if (sensorColor === color.WARNING_COLOR && newcolor !== color.ERROR_COLOR) {
        newcolor = color.WARNING_COLOR
      }
    }
    return newcolor
  }

  // real-time binding method for single shape
  bindToShape(shape: joint.dia.Element) {
    this.sensors.forEach((sensor) => {
      sensor.subscribeAndTrack(() => {
        const newColor = this.getColorFromReadings()
        shape.attr('body/fill', newColor)
      })
    })
  }

  // real-time binding method for multiple shapes
  bindToShapes(shapes: joint.dia.Element[]) {
    this.sensors.forEach((sensor) => {
      sensor.subscribeAndTrack(() => {
        const newColor = this.getColorFromReadings()

        shapes.forEach((shape) => {
          shape.attr('body/fill', newColor)
        })
      })
    })
  }

  // Returns all topics for the sensors on this machine
  getAllSensorTopics(): string[] {
    return this.sensors.map((sensor) => sensor.getTopic())
  }

  /**
   * Binds the machine's color updates to the shape associated via machine_id in its `customData`.
   * this is wrapper to call bind all shapes to the machines for changing color
   */
  bindColorUpdatesFromShapeMap(shapeMap: Record<string, joint.dia.Element>) {
    const shapeEntry = Object.values(shapeMap).find(
      (shape) => shape.get('customData')?.machine_id === this.machine_id
    )
    if (shapeEntry) {
      this.subscribeToColorChange((_, color) => {
        shapeEntry.attr('body/fill', color)
      })
    }
  }
}
