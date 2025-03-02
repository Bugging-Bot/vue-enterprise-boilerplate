/**
 * Pump shape definition for SCADA diagrams
 * Represents fluid transfer equipment with customizable properties
 */
import * as joint from 'jointjs'

export const Pump = joint.dia.Element.extend({
  defaults: joint.util.defaultsDeep(
    {
      type: 'custom.Pump',
      size: { width: 100, height: 100 },
      markup: [
        {
          tagName: 'image',
          selector: 'image'
        }
      ],
      attrs: {
        image: {
          'xlink:href': '/assets/Pump.svg',
          width: 100,
          height: 100
        }
      }
    },
    joint.dia.Element.prototype.defaults
  )
})
