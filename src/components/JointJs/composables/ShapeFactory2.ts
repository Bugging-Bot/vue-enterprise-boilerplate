/**
 * Creates a new shape element on a JointJS graph
 * @param position - The x and y coordinates for the shape's position
 * @param size - The width and height dimensions of the shape
 * @param label - The text to display inside the shape
 * @param fill - The background color of the shape
 * @param customAttributes - Optional additional attributes to apply to the shape
 * @param graph - The JointJS graph to add the shape to
 * @returns The created shape element
 */
import * as joint from '@joint/core'

const sanitizeSvgPath = (path: string): string => {
  // Regular expression that matches valid SVG path commands only.
  const validPathRegex = /^[MLHVCSQTAZmlhvcsqtaz0-9,.+\- ]*$/

  // Check if the path matches the allowed pattern
  if (!validPathRegex.test(path)) {
    throw new Error('Invalid SVG path provided')
  }
  return path // Return the sanitized path
}
// not working
export function CreateShape(
  name: string,
  position: { x: number; y: number },
  size: { width: number; height: number },
  label: string,
  fill: string,
  svg: string,
  customAttributes: any = {},
  graph: joint.dia.Graph
) {
  const shapeClass = joint.dia.Element.define(name, {
    size: size,
    position: position,
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        refX: 0,
        refY: 0,
        fill: fill,
        stroke: 'black',
        strokeWidth: 1,
        d: sanitizeSvgPath(svg) // Example path (rectangle)
      },
      label: {
        text: label,
        fontSize: 15,
        fill: 'black',
        refX: '50%',
        refY: '50%',
        textAnchor: 'middle',
        alignmentBaseline: 'middle'
      }
    },
    // Adding custom attributes to the shape
    custom: customAttributes
  })

  // Create a new instance of the shape
  const shape = new shapeClass()

  // Add the shape to the graph
  graph.addCell(shape)
  return shape
}
