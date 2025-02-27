export interface Port {
  id: string
  group: 'input' | 'output'
  position: {
    x: number
    y: number
  }
}

export interface DiagramElement {
  id: string
  type: 'rectangle' | 'circle' | 'custom'
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  ports: Port[]
}
