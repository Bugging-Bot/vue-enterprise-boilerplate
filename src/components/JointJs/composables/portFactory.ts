// This code is for creating ports at typeScript
// components/jointjs/portFactory.ts
import * as joint from 'jointjs'

/**
 * Adds ports to a JointJS element with configurable port group and positioning.
 *
 * @param element The JointJS diagram element to add ports to
 * @param portGroup The group of ports to add, defaulting to 'in' (input ports)
 */
export function addPorts(element: joint.dia.Element, portGroup = 'in'): void {
  element.addPorts([
    {
      id: `${portGroup}-1`,
      group: portGroup,
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#000',
          fill: '#fff'
        }
      }
    }
  ])

  element.set('ports', {
    groups: {
      [portGroup]: {
        position: portGroup === 'in' ? 'left' : 'right',
        attrs: {
          circle: { fill: '#31d0c6', stroke: '#000', r: 6 }
        }
      }
    }
  })
}
