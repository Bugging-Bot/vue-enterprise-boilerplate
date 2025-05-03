/**
 * Vue composable for JointJS paper setup and configuration
 * Provides reusable functionality for creating and managing JointJS diagrams
 */

import * as joint from '@joint/core'
import type { Ref } from 'vue' // Use type-only import for Ref
import { ShapeFactory } from './ShapeFactory'
import { logger } from '@/utils/logger'

// Create a namespace that includes both joint.shapes and our custom ShapeFactory
const genericNamespace = { ...joint.shapes, ShapeFactory }

// Define the grid options type to match JointJS expectations
type GridOptions = {
  name: 'doubleMesh' | 'dot' | 'fixedDot' | 'mesh'
  args?: any[]
}

/**
 * Creates a JointJS paper and graph with specified dimensions and grid configuration
 * Updated to accept a DOM element reference
 * Objective :
 * To create and configure a JointJS paper and graph inside a specified DOM container, using custom or fallback dimensions and grid settings.
 * Logic:
 * 1. Graph Creation
 *    Initializes a JointJS graph, using a custom namespace for shapes.
 * 2. Container Validation
 *    Ensures that a valid DOM element is provided.
 *    Logs an error and throws an exception if missing.
 * 3. Determine Dimensions
 *    Uses the actual container dimensions if available.
 *    Falls back to provided width/height if needed.
 *    Applies a minimum height of 1200px for usability.
 * 4. Configure and Create the Paper
 *    Applies settings
 * 5. Return Result
 *    Returns both the configured paper and graph for use in the app.
 *
 * Use Cases:
 * Useful when you want to embed a diagram editor or viewer into a specific part of your UI, with full control over its size and grid visibility.
 *
 * @param paperContainer - The DOM element reference that will contain the paper
 * @param widthInput - The width of the paper (will use container width if available)
 * @param heightInput - The height of the paper (will use container height if available)
 * @param gridSizeInput - The size of the grid, with 0 or negative values disabling the grid
 * @returns An object containing the configured JointJS paper and graph
 */
export function CreateLayout(
  paperContainer: HTMLElement | null,
  widthInput: number,
  heightInput: number,
  gridSizeInput: number
): { paper: joint.dia.Paper; graph: joint.dia.Graph } {
  const graph = new joint.dia.Graph({}, { cellNamespace: genericNamespace })

  if (!paperContainer) {
    logger.error('Paper container element is null')
    //console.error('Paper container element is null')
    throw new Error('Paper container element is null')
  }

  // Get container dimensions if available
  const containerWidth = paperContainer.offsetWidth || widthInput
  let containerHeight = paperContainer.offsetHeight || heightInput
  if (containerHeight <= 600) containerHeight = 1200 // Minimum height

  //console.log('Container dimensions:', containerWidth, 'x', containerHeight)
  logger.debug('CreateLayout => Container dimensions:', containerWidth, 'x', containerHeight)

  // Create the paper with proper type for drawGrid
  const paper = new joint.dia.Paper({
    /*  */ width: containerWidth,
    height: containerHeight,
    gridSize: gridSizeInput,
    background: { color: '#f8f9fa' },
    model: graph,
    drawGrid:
      gridSizeInput > 0
        ? ({
            name: 'doubleMesh' as const, // Use const assertion
            args: [
              { color: 'rgba(0, 255, 0, 0.3)', thickness: 1 },
              { color: 'rgba(255, 0, 0, 0.3)', scaleFactor: 5, thickness: 2 }
            ]
          } as GridOptions)
        : false, // Cast to GridOptions
    cellViewNamespace: genericNamespace,
    async: true,
    el: paperContainer
  })
  logger.debug('CreateLayout => Paper & graph created')

  return { paper, graph }
}

/**
 * Cleans up a JointJS paper and graph by removing the paper and clearing the graph
 *
 * @param paper - The JointJS paper to be removed
 * @param graph - The JointJS graph to be cleared
 */
export function CleanGraph(paper: joint.dia.Paper, graph: joint.dia.Graph) {
  if (paper) {
    logger.debug('CleanGraph => Removing paper and clearing graph')
    paper.remove()
  }
  if (graph) {
    logger.debug('CleanGraph => Clearing graph')
    graph.clear()
  }
}
