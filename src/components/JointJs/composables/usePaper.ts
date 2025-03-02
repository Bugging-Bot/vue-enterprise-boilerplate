/**
 * Vue composable for JointJS paper setup and configuration
 * Provides reusable functionality for creating and managing JointJS diagrams
 */

import * as joint from 'jointjs'
import { dia } from 'jointjs'

interface PaperOptions extends joint.dia.Paper.Options {
  width?: number
  height?: number
  gridSize?: number
  drawGrid?: boolean
  interactive?: boolean | object
}

interface PaperSetup {
  graph: dia.Graph
  paper: dia.Paper
}

/**
 * Creates and configures a JointJS paper instance
 * @param elementId - DOM element ID where the paper will be rendered
 * @param options - Optional paper configuration options
 * @returns Object containing graph and paper instances
 */
export function usePaper() {
  const setupPaper = (elementId: string, options: PaperOptions = {}): PaperSetup => {
    // Create a new JointJS graph instance
    const graph = new joint.dia.Graph()

    // Get the DOM element for paper mounting
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id '${elementId}' not found`)
    }

    // Create and configure the paper with default and custom options
    const paper = new joint.dia.Paper({
      el: element,
      model: graph,
      width: 800,
      height: 500,
      gridSize: 10,
      drawGrid: true,
      interactive: { elementMove: true },
      ...options
    })

    return { graph, paper }
  }

  return {
    setupPaper
  }
}
