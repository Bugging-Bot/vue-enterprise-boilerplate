/**
 * Tank shape definition for SCADA diagrams
 * Represents industrial storage tanks with customizable properties
 */
import * as joint from 'jointjs'

export const Tank = joint.dia.Element.extend({
  defaults: joint.util.defaultsDeep(
    {
      type: 'custom.Tank',
      size: { width: 100, height: 100 },
      markup: [
        {
          tagName: 'image',
          selector: 'image'
        }
      ],
      attrs: {
        image: {
          'xlink:href': '/assets/Tank.svg',
          width: 100,
          height: 100
        }
      }
    },
    joint.dia.Element.prototype.defaults
  )
})
