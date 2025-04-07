/**
 * Vue composable for JointJS paper setup and configuration
 * Provides reusable functionality for creating and managing JointJS diagrams
 */

import * as joint from '@joint/core'
import type { Ref } from 'vue' // Use type-only import for Ref
import { ShapeFactory } from './ShapeFactory'

// Create a namespace that includes both joint.shapes and our custom ShapeFactory
const genericNamespace = { ...joint.shapes, ShapeFactory }

// Define the grid options type to match JointJS expectations
type GridOptions = {
  name: 'doubleMesh' | 'dot' | 'fixedDot' | 'mesh'
  args?: any[]
}

/**
 * Creates a JointJS paper and graph with container-responsive dimensions
 *
 * @param containerRef - Vue ref to the DOM element that will contain the paper
 * @param options - Optional configuration for the paper
 * @returns An object containing the configured JointJS paper, graph, and utility functions
 */
export function useJointJS(containerRef: Ref<HTMLElement | null>, options = {}) {
  // Create a new graph with our custom namespace
  const graph = new joint.dia.Graph({}, { cellNamespace: genericNamespace })
  let paper: joint.dia.Paper | null = null

  // Initialize the paper with the DOM element
  const initializePaper = () => {
    if (!containerRef.value) {
      console.warn('Container ref is null, cannot initialize paper')
      return null
    }

    // Get container dimensions
    const containerWidth = containerRef.value.offsetWidth
    let containerHeight = containerRef.value.offsetHeight
    if (containerHeight < 600) containerHeight = 1200 // Minimum height

    // Default paper options
    const defaultOptions = {
      width: containerWidth,
      height: containerHeight,
      gridSize: 10,
      background: { color: '#f8f9fa' },
      drawGrid: {
        name: 'doubleMesh' as const, // Use const assertion to fix the type
        args: [
          { color: 'rgba(0, 255, 0, 0.3)', thickness: 1 },
          { color: 'rgba(255, 0, 0, 0.3)', scaleFactor: 5, thickness: 2 }
        ]
      } as GridOptions, // Cast to GridOptions
      model: graph,
      cellViewNamespace: genericNamespace,
      async: true,
      el: containerRef.value
    }

    // Create paper with merged options
    paper = new joint.dia.Paper({
      ...defaultOptions,
      ...options
    })

    console.log('Paper initialized with dimensions:', containerWidth, 'x', containerHeight)
    return paper
  }

  // Clean up resources
  const cleanup = () => {
    if (paper) {
      paper.remove()
      paper = null
    }
    graph.clear()
  }

  // Add shapes to the graph
  const addShapes = (shapes: joint.dia.Element | joint.dia.Element[]) => {
    if (Array.isArray(shapes)) {
      graph.addCells(shapes)
    } else {
      graph.addCell(shapes)
    }
  }

  // Connect shapes with links
  const connectShapes = (
    source: joint.dia.Element,
    target: joint.dia.Element,
    linkOptions = {}
  ): joint.dia.Link => {
    const link = new joint.shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      ...linkOptions
    })
    graph.addCell(link)
    return link
  }

  return {
    graph,
    paper,
    initializePaper,
    cleanup,
    addShapes,
    connectShapes
  }
}

/**
 * Creates a JointJS paper and graph with specified dimensions and grid configuration
 * Updated to accept a DOM element reference
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
    console.error('Paper container element is null')
    throw new Error('Paper container element is null')
  }

  // Get container dimensions if available
  const containerWidth = paperContainer.offsetWidth || widthInput
  let containerHeight = paperContainer.offsetHeight || heightInput
  if (containerHeight <= 600) containerHeight = 1200 // Minimum height

  console.log('Container dimensions:', containerWidth, 'x', containerHeight)

  // Create the paper with proper type for drawGrid
  const paper = new joint.dia.Paper({
    width: containerWidth,
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
    paper.remove()
  }
  if (graph) {
    graph.clear()
  }
}
