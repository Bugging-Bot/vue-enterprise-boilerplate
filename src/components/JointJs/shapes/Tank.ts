/**
 * Tank shape definition for SCADA diagrams
 * Represents industrial storage tanks with customizable properties
 */
import * as joint from '@joint/core'

/**
 * Tank shape definition for SCADA diagrams
 * Represents industrial storage tanks with customizable properties
 */
export class Tank extends joint.dia.Element {
  constructor(attributes?: joint.dia.Element.Attributes) {
    // Set the defaults directly using `joint.util.defaultsDeep`
    const defaults = joint.util.defaultsDeep(
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

    // Call the parent constructor with the defaults
    super({ ...defaults, ...attributes }) // Merge custom attributes if provided
  }
}
