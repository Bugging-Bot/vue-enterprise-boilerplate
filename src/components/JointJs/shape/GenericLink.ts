import { dia } from 'jointjs'

// Define an interface for the properties (props) expected in the constructor
export interface GenericLinkProps {
  linkID?: string // Custom link ID
  customData?: any // Custom data for the link (can be any type)
  source?: { id: string } | { x: number; y: number } // Source of the link (optional)
  target?: { id: string } | { x: number; y: number } // Target of the link
  attrs?: dia.Link.Attributes // Optional: Custom styles for the link
  // adding for router fill issue
  router?: any // Optional: Router configuration
}

// Define default attributes outside the constructor
const defaultAttrs: dia.Link.Attributes = {
  line: {
    connection: true,
    stroke: '#346f83',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    fill: 'transparent' // Set fill to transparent for line, to avoid filling after routing
  },
  outline: {
    connection: true,
    stroke: '#004456',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    fill: 'transparent' //Set fill to transparent for line, to avoid filling after routing
  },
  label: {
    text: '',
    fontSize: 12,
    fill: 'black',
    ref: 'line',
    refX: 0.5,
    refY: 0.5,
    xAlignment: 'middle',
    yAlignment: 'middle'
  }
}

// Define GenericLink class that extends dia.Link
export class GenericLink extends dia.Link {
  constructor(props: GenericLinkProps) {
    const {
      linkID = 'default-link-id',
      customData = {},
      source,
      target,
      attrs = {},
      router = {} //adding for router fill issue
    } = props

    // Merge provided attrs with defaults
    const mergedAttrs: dia.Link.Attributes = {
      ...defaultAttrs,
      ...attrs
    }

    // Call the parent constructor with the merged properties
    super({
      type: 'GenericLink',
      source,
      target,
      attrs: mergedAttrs,
      markup: [
        { tagName: 'path', selector: 'outline' },
        { tagName: 'path', selector: 'line' },
        { tagName: 'text', selector: 'label' } // Ensure the label is visible
      ]
    })

    // Set custom properties
    this.set('linkID', linkID)
    this.set('customData', customData)
    // applying this for router fill issue
    // Apply the router configuration (if provided)
    if (router && router.name) {
      this.router(router.name, router.options || {})
    }
  }

  // Getter and Setter for customData property
  getCustomData(): any {
    return this.get('customData')
  }

  setCustomData(data: any): void {
    this.set('customData', data)
  }
}
