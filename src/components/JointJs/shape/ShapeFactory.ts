// src/components/JointJs/shapes/GenericShape.ts
import { dia, shapes } from '@joint/core' //'jointjs'

export interface CustomShapeProps {
  shapeId?: string // Custom shape ID
  customData?: any // Custom data for the shape (can be any type)
  position: { x: number; y: number }
  size?: { width: number; height: number }
  svgPath: string // The SVG path (refD)
  fill?: string
  stroke?: string
  strokeWidth?: number
  label?: string
  labelFontSize?: number
  labelPosition?: { x: number; y: number }
  AssetTrackingID?: string
  SN?: string
}

// Function to sanitize SVG Path (basic example)
const sanitizeSvgPath = (path: string): string => {
  // Regular expression that matches valid SVG path commands only.
  const validPathRegex = /^[MLHVCSQTAZmlhvcsqtaz0-9,.+\- ]*$/

  // Check if the path matches the allowed pattern
  if (!validPathRegex.test(path)) {
    throw new Error('Invalid SVG path provided')
  }
  return path // Return the sanitized path
}

export class ShapeFactory extends dia.Element {
  constructor(props: CustomShapeProps) {
    // Destructure props and set default values for optional properties
    const {
      shapeId = '',
      position,
      size = { width: 30, height: 100 }, // Default size
      svgPath,
      fill = '#FFFFFF', // Default fill color
      stroke = '#000000', // Default stroke color
      strokeWidth = 1, // Default stroke width
      label = '', // Default label
      labelFontSize = 12, // Default label font size
      labelPosition, // Default label position
      AssetTrackingID = 'Not Assigned',
      SN = 'Not Assigned'
    } = props

    // Sanitize the SVG path before using it
    const sanitizedSvgPath = sanitizeSvgPath(svgPath)
    // Calculate scale factors based on the desired width/height and the bounding box of the SVG
    const scaleX = size.width / 30 // 30 is an arbitrary base width for your SVG path
    const scaleY = size.height / 100 // 100 is an arbitrary base height for your SVG path

    // Apply the scale transform to the SVG path
    const transform = `scale(${scaleX}, ${scaleY})`

    // Calculate label position if not provided (center by default)
    const labelX = labelPosition ? labelPosition.x : 'calc(w / 2)'
    const labelY = labelPosition ? labelPosition.y : 'calc(h / 2)'

    super({
      type: 'GenericShape',
      shapeId,
      position,
      size,
      attrs: {
        body: {
          d: sanitizedSvgPath, // Use sanitized SVG path
          fill,
          stroke,
          strokeWidth,
          transform // Apply the scale transform here
        },
        label: {
          text: label,
          textAnchor: 'middle',
          x: labelX, //'50%', //'calc(w / 2)',
          y: labelY, //'50%', //'calc(h / 2)',
          fontSize: labelFontSize
        },
        tracking: {
          AssetTrackingID,
          SN
        }
      },
      markup: [
        { tagName: 'path', selector: 'body' },
        { tagName: 'text', selector: 'label' }
      ]
    })
  }
  // Adding methods to access custom properties in a type-safe manner
  getAssetTrackingID(): string {
    return this.attr('tracking/AssetTrackingID') || 'Not Assigned'
  }

  getSN(): string {
    return this.attr('tracking/SN') || 'Not Assigned'
  }
}
