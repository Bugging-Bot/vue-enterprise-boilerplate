import { dia } from '@joint/core' //'jointjs'
import { CONNECTORS_SHAPES } from './Constants'

// Define an interface for the properties (props) expected in the constructor
export interface CustomLinkOptions extends dia.Link.Attributes {
  customData?: any
  eventTopics?: string[]
}

// Define default attributes outside the constructor
const defaultAttrs: dia.Link.Attributes = {
  line: {
    connection: true,
    stroke: '#000000',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    fill: 'transparent', // Set fill to transparent for line, to avoid filling after routing
    markerEnd: {
      type: 'path', // Type of marker (arrowhead)
      d: CONNECTORS_SHAPES.Rtrinagle, // Define the shape of the arrow (M = move to, L = line to)
      fill: '#000000' // Fill color of the arrowhead
    }
  },
  outline: {
    connection: true,
    stroke: '#000000',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    fill: 'transparent',
    markerEnd: {
      type: 'path',
      d: 'M 0 0 L 10 5 L 0 10 Z', // Define the arrow shape
      fill: '#000000' // Color of the arrow
    }
  },
  label: {
    text: 'Defautl Label',
    fontSize: 12,
    fill: 'black',
    ref: 'line',
    refX: 0.5,
    refY: 0.5,
    xAlignment: 'middle',
    yAlignment: 'middle'
  }
}

export class LinkFactory extends dia.Link {
  constructor(options: CustomLinkOptions) {
    // Create a deep copy of default attributes
    const attrs: dia.Link.Attributes = JSON.parse(JSON.stringify(defaultAttrs))

    // Only override attributes that are explicitly provided
    if (options.line) attrs.line = options.line
    if (options.outline) attrs.outline = options.outline
    if (options.label) attrs.label = options.label

    super({
      type: 'LinkFactory',
      attrs: attrs,
      markup: [
        { tagName: 'path', selector: 'outline' },
        { tagName: 'path', selector: 'line' },
        { tagName: 'text', selector: 'label' }
      ]
    })

    // Rest of the constructor remains the same
    if (options.customData) {
      this.set('customData', options.customData)
    }

    if (options.eventTopics) {
      this.set('eventTopics', options.eventTopics)
    }
  } // Getter and Setter for customData property
  getCustomData(): any {
    return this.get('customData')
  }
  // Get the list of subscribed event topics
  getEventsTopics(): string[] {
    return this.get('eventTopics') || []
  }

  // Event handler
  handleEvent(topic: string) {
    return (args: any) => {
      console.log(`Event ${topic} triggered with arguments:`, args)
    }
  }

  // subscribe to events
  subscribeToEvents(eventTopics: string[]): void {
    eventTopics.forEach((topic) => {
      this.on(topic, (args: any) => {
        console.log(`Event ${topic} triggered with arguments:`, args)
      })
    })
  }

  // Unsubscribe from event topics
  unsubscribeFromEvents(eventTopics: string[]): void {
    eventTopics.forEach((topic) => {
      this.off(topic) // Remove the event listener for the specified topic
      console.log(`Unsubscribed from event ${topic}`)
    })
  }

  // trigger an event
  triggerEvent(topic: string, args?: any): void {
    this.trigger(topic, args)
  }
}

// Function to create a new link (web link) between two elements
// export const createLink = (
//   source: dia.Element,
//   target: dia.Element,
//   customData: any = {},
//   eventTopics: string[] = []
// ): LinkFactory => {
//   return new LinkFactory({
//     source: { id: source.id },
//     target: { id: target.id },
//     customData,
//     eventTopics
//   })
// }
