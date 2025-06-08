/*
  File: nodeFactory.ts

  About:
  This file contains utility functions to create custom nodes and edges for a Vue Flow diagram.
  - `createCustomNode`: Creates a custom node with a given position, type, and data.
  - `createCustomEdge`: Creates a custom edge connecting a source and target node, with optional custom data.
*/

import type { CustomNode, CustomEdge, CustomNodeData, CustomEdgeData } from './types' // Import custom types for nodes and edges
import { nanoid } from 'nanoid' // Import nanoid for generating unique IDs

// Function to create a custom node
export function createCustomNode(
  type: string = 'default', // Node type, defaults to 'default'
  position: { x: number; y: number }, // Position of the node on the canvas
  data: Partial<CustomNodeData> = {} // Partial custom data for the node
): CustomNode {
  return {
    id: nanoid(), // Unique ID generated for the node
    type, // Type of the node
    position, // Position of the node
    data: {
      ...data, // Spread the custom data passed in
      label: data.label || 'New Node', // Default label if not provided
      code: data.code || '', // Code field, default empty
      svgPath: data.svgPath || '', // SVG path, default empty
      settings: data.settings || {}, // Custom settings, default empty object
      output: data.output || null, // Output field, default null
      logicType: data.logicType || 'javascript', // Default logic type is 'javascript'
      localItem: data.localItem ?? null
    }
  }
}

// Function to create a custom edge
export function createCustomEdge(
  source: string, // ID of the source node
  target: string, // ID of the target node
  data: Partial<CustomEdgeData> = {} // Partial custom data for the edge
): CustomEdge {
  return {
    id: nanoid(), // Unique ID generated for the edge
    source, // Source node ID
    target, // Target node ID
    data: {
      ...data, // Spread the custom data passed in
      label: data.label || '', // Default label if not provided
      code: data.code || '', // Code field, default empty
      settings: data.settings || {}, // Custom settings, default empty object
      output: data.output || null // Output field, default null
    }
  }
}
