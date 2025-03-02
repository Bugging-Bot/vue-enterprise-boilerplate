/**
 * Valve shape definition for SCADA diagrams
 * Represents flow control components with customizable properties
 */
import * as joint from 'jointjs'

export const Valve = joint.dia.Element.extend({
    defaults: joint.util.defaultsDeep({
        type: 'custom.Valve',
        size: { width: 100, height: 100 },
        markup: [{
            tagName: 'image',
            selector: 'image'
        }],
        attrs: {
            image: {
                'xlink:href': '/assets/Valve.svg',
                width: 100,
                height: 100
            }
        }
    }, joint.dia.Element.prototype.defaults)
})
