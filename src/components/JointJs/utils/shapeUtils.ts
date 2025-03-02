/**
 * Utility functions for managing JointJS shapes and connections in SCADA diagrams.
 * Provides reusable methods for shape positioning and linking operations.
 */

import * as joint from 'jointjs'
import { dia } from 'jointjs'

interface Position {
  x: number
  y: number
}

/**
 * Adds a shape to the graph at the specified position
 * @param shape - The JointJS shape element to add
 * @param graph - The JointJS graph instance
 * @param position - The x,y coordinates for shape placement
 * @returns The added shape instance
 */
export const addShapeToGraph = (
  shape: dia.Element,
  graph: dia.Graph,
  position: Position
): dia.Element => {
  shape.position(position.x, position.y)
  shape.addTo(graph)
  return shape
}

/**
 * Creates a link between two shapes in the graph
 * @param source - The source shape to connect from
 * @param target - The target shape to connect to
 * @param graph - The JointJS graph instance
 * @returns The created link instance
 */
export const connectShapes = (
  source: dia.Element,
  target: dia.Element,
  graph: dia.Graph
): dia.Link => {
  const link = new joint.shapes.standard.Link()
  link.source(source)
  link.target(target)
  link.addTo(graph)
  return link
}
