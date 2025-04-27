import { RawProductionLine } from './ProductionLine'

export interface RawFactoryConfig {
  factories: RawFactory[]
}

export class RawFactory {
  constructor(
    public factory_id: number,
    public metadata: any, // to accept any data in meta data
    public production_lines: RawProductionLine[]
  ) {}

  // getAllSensorTopics(): string[] {
  //   return this.production_lines.flatMap((p) => p.getAllSensorTopics())
  // }
  // get id
  getId(): number {
    return this.factory_id
  }
  // get metadata
  getMetadata(): any {
    return this.metadata
  }
  // get production lines
  getProductionLines(): RawProductionLine[] {
    return this.production_lines
  }

  getProductionLineById(id: number): RawProductionLine | undefined {
    return this.production_lines.find((p) => p.production_line_id === id)
  }
  // get production line names
  getProductionLineNames(): string[] {
    return this.production_lines.map((line) => line.metadata.line_name)
  }

  // get production line ids
  getProductionLineIds(): number[] {
    return this.production_lines.map((line) => line.production_line_id)
  }
}
