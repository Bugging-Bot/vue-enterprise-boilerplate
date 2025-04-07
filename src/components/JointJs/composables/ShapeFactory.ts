// src/components/JointJs/shapes/GenericShape.ts
//import { dia, shapes } from '@joint/core' //'jointjs'
import * as joint from '@joint/core'

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
  AssetTrackingID?: string // remove this
  SN?: string // remove this
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

export class ShapeFactory extends joint.dia.Element {
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

// creating function to create custom shape
export function CreateShape(
  position: { x: number; y: number },
  size: { width: number; height: number },
  svgpath: string,
  label: string,
  labelPosition: { x: number; y: number },
  fill: string,
  customAttributes: any = {},
  graph: joint.dia.Graph
  // props: CustomShapeProps
): joint.dia.Element {
  const shapeInstance = new ShapeFactory({
    position: position,
    size: size, //custom size of shape, but this changes the position of label
    svgPath: svgpath, // Example path
    fill: 'transparent',
    stroke: '#0f0f0f',
    strokeWidth: 0.5,
    label: label,
    labelFontSize: 14,
    labelPosition: labelPosition,
    customData: customAttributes
  })
  // add shape to graph

  /*
  // namespace contains all the objects that you will use to build your diagrams, // this contains list of out of box shapes and custome shapes like ShapeFactory
const genericNamespace = { ...shapes, ShapeFactory }
const genericGraph = new dia.Graph({}, { cellNamespace: genericNamespace })
  */
  graph.addCell(shapeInstance)
  if (graph.getCells().length === 0) {
    console.log('Graph is empty')
  } else {
    console.log('Graph contains cells', graph.getCells())
  }

  return shapeInstance
}
