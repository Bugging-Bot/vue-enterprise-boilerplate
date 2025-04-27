import type { RawMachine } from './Machine'

export interface RawProductionLineConfig {
  production_lines: RawProductionLine[]
}

export class RawProductionLine {
  constructor(
    public production_line_id: number,
    public metadata: any,
    public machines: RawMachine[]
  ) { }

  // get production line id
  getId(): number {
    return this.production_line_id
  }
  // get metadata
  getMetadata(): any {
    return this.metadata
  }

  // get machines
  getMachines(): RawMachine[] {
    return this.machines
  }

  // get machine by id
  getMachineById(id: number): RawMachine | undefined {
    return this.machines.find((m) => m.machine_id === id)
  }
}
  // getAllSensorTopics(): string[] {
  //   return this.machines.flatMap((machine) => machine.getSensorTopics())
  // }

  // // get machine
  // getMachine(): RawMachine[] {
  //   return this.machines
  // }
//}
