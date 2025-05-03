import { RawFactory } from './Factory'
import { RawProductionLine } from './ProductionLine'
import { RawMachine } from './Machine'
import { RawSensor } from './Sensor'
import { logger } from '@/utils/logger'

/**
 * Processes factory configuration data, providing methods to access and manipulate factory, production line, and machine information.
 *
 * @class
 * @description Parses and manages factory configuration, allowing retrieval of factories, sensor topics, and printing configuration summaries.
 */
export class FactoryProcessor {
  private factories: RawFactory[]

  constructor(configData: { factories: any[] }) {
    //const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as RawFactoryConfig
    this.factories = this.parseFactories(configData.factories)
  }

  // Convert plain data into class instances
  /**
   * Parses raw factory configuration data into RawFactory instances.
   *
   * @param factoriesData An array of raw factory configuration objects
   * @returns An array of RawFactory instances with nested production lines, machines, and sensors
   * @description Transforms raw configuration data into structured factory objects with hierarchical relationships
   */
  private parseFactories(factoriesData: any[]): RawFactory[] {
    return factoriesData.map((factoryData) => {
      const factory = new RawFactory(
        factoryData.factory_id,
        factoryData.metadata,
        factoryData.production_lines.map((line: any) => {
          return new RawProductionLine(
            line.production_line_id,
            line.metadata,
            line.machines.map((machine: any) => {
              return new RawMachine(
                machine.machine_id,
                machine.metadata,
                machine.sensors.map((sensor: any) => {
                  return new RawSensor(
                    sensor.id,
                    sensor.sensor,
                    sensor.code,
                    sensor.unit,
                    sensor.measure,
                    sensor.topic,
                    sensor.range,
                    sensor.operational_range,
                    sensor.warning_range,
                    sensor.error_range,
                    sensor.danger_range,
                    sensor.accuracy,
                    sensor.reading
                  )
                })
              )
            })
          )
        })
      )
      return factory
    })
  }

  /**
   * Retrieves a factory by its unique identifier.
   *
   * @param id The unique identifier of the factory to find
   * @returns The matching RawFactory or undefined if no factory is found
   */
  getFactoryById(id: number): RawFactory | undefined {
    //return this.factories.find((f) => f.factory_id === id)
    logger.info('getFactoryById :', id)
    return this.factories.find((f) => f.getId() === id)
  }

  /**
   * Retrieves a production line by its factory and production line identifiers.
   *
   * @param factoryId The unique identifier of the factory
   * @param productionLineId The unique identifier of the production line within the specified factory
   * @returns The matching RawProductionLine or undefined if no production line is found
   */
  getProductionLineById(
    factoryId: number,
    productionLineId: number
  ): RawProductionLine | undefined {
    const factory = this.getFactoryById(factoryId)
    if (factory) {
      logger.info('getProductionLineById :', factoryId, productionLineId)
      return factory.getProductionLineById(productionLineId)
    }
    return undefined
  }

  /**
   * Retrieves a machine by its factory, production line, and machine identifiers.
   *
   * @param factoryId The unique identifier of the factory
   * @param productionLineId The unique identifier of the production line within the specified factory
   * @param machineId The unique identifier of the machine within the specified production line
   * @returns The matching RawMachine or undefined if no machine is found
   */
  getMachineById(
    factoryId: number,
    productionLineId: number,
    machineId: number
  ): RawMachine | undefined {
    const productionLine = this.getProductionLineById(factoryId, productionLineId)
    if (productionLine) {
      logger.info('getMachineById :', factoryId, productionLineId, machineId)
      return productionLine.getMachineById(machineId)
    }
    return undefined
  }

  /**
   * Retrieves all sensors for a specific machine within a factory and production line.
   *
   * @param factoryId The unique identifier of the factory
   * @param productionLineId The unique identifier of the production line within the specified factory
   * @param machineId The unique identifier of the machine within the specified production line
   * @returns An array of RawSensor objects associated with the machine, or an empty array if the machine is not found
   */
  getAllSensorOfMachine(
    factoryId: number,
    productionLineId: number,
    machineId: number
  ): RawSensor[] {
    const machine = this.getMachineById(factoryId, productionLineId, machineId)
    if (machine) {
      logger.info('getAllSensorOfMachine :', factoryId, productionLineId, machineId)
      return machine.sensors
    }
    return []
  }

  /**
   * Retrieves all sensor topics for a specific machine within a factory and production line.
   *
   * @param factoryId The unique identifier of the factory
   * @param productionLineId The unique identifier of the production line within the specified factory
   * @param machineId The unique identifier of the machine within the specified production line
   * @returns An array of sensor topics associated with the machine, or an empty array if the machine is not found
   */
  getAllSensorTopicsOfMachine(
    factoryId: number,
    productionLineId: number,
    machineId: number
  ): string[] {
    const factory = this.getFactoryById(factoryId)
    if (!factory) {
      logger.warn(`Factory with ID ${factoryId} not found.`)
      return []
    }
    const productionLine = factory?.getProductionLineById(productionLineId)
    if (!productionLine) {
      logger.warn(`Production line with ID ${productionLineId} not found.`)
      return []
    }
    const machine = productionLine?.getMachineById(machineId)

    if (machine) {
      logger.info('getAllSensorTopicsOfMachine :', factoryId, productionLineId, machineId)
      return machine.getSensors().map((sensor) => sensor.getTopic())
    } else {
      logger.warn(`Machine with ID ${machineId} not found.`)
      return []
    }
  }
}

/**
 * Returns all sensor topics for a given machine in a production line and factory.
 *
 * @param config factory_config.json file
 * @param factoryId Factory identifier
 * @param lineId Production line identifier
 * @param machineId Machine identifier
 * @returns Array of sensor topics or empty array if not found
 */
// export function getMachineSensorTopics(
//   config: RawFactoryConfig,
//   factoryId: number,
//   lineId: number,
//   machineId: number
// ): string[] {
//   // if (!fs.existsSync(configPath)) {
//   //   throw new Error(`Configuration file not found at ${configPath}`)
//   // }

//   const processor = new FactoryProcessor(config)

//   const factory = processor.getFactoryById(factoryId)
//   if (!factory) {
//     console.warn(`Factory with ID ${factoryId} not found.`)
//     return []
//   }

//   const line = factory.getProductionLineById(lineId)
//   if (!line) {
//     console.warn(`Production line with ID ${lineId} not found in factory ${factoryId}.`)
//     return []
//   }

//   const machine = line.getMachineById(machineId)
//   if (!machine) {
//     console.warn(
//       `Machine with ID ${machineId} not found in line ${lineId} of factory ${factoryId}.`
//     )
//     return []
//   }
// const topics = machine.getSensors().map((sensor) => sensor.getTopic())

//   return topics
//}
