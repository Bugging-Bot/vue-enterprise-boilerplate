/*
  File: types.ts

  About:
  This file defines custom TypeScript types and interfaces for a visual workflow application.
  It extends and customizes types from @vue-flow/core to include additional data
  for nodes, edges, dialogs, and workflow-related logic and settings.
*/

import type { Node, Edge } from '@vue-flow/core' // Import base Node and Edge types from Vue Flow

// Interface for custom node data structure
export interface CustomNodeData {
  label?: string // Optional label for the node
  code?: string // Optional code snippet associated with the node
  svgPath?: string // Optional SVG path string for custom node visuals
  settings?: Record<string, any> // Custom settings in key-value pairs
  output?: any // Output data from the node
  logicType?: 'python' | 'golang' | 'javascript' | 'temporal' // Type of logic the node uses
  localItem: CustomNode | CustomEdge | null // The actual node or edge being edited
  [key: string]: any // Allow additional dynamic properties
}

// Interface for custom edge data structure
export interface CustomEdgeData {
  label?: string // Optional label for the edge
  code?: string // Optional code associated with the edge
  settings?: Record<string, any> // Custom settings in key-value pairs
  output?: any // Output data from the edge
  [key: string]: any // Allow additional dynamic properties
}

// Type alias for a custom node using CustomNodeData
export type CustomNode = Node<CustomNodeData>

// Type alias for a custom edge using CustomEdgeData
export type CustomEdge = Edge<CustomEdgeData>

// Type for possible dialog contexts
export type DialogType = 'node' | 'edge' | 'background' | null

type LogicState = {
  code: '' // Logic code (for nodes and edges that require it)
  language: 'python' // Default language for logic code
  uploadedFiles: [] // Files uploaded related to logic or other settings
}

// Interface representing the state of the property dialog
export interface PropertyDialogState {
  isOpen: boolean // Whether the dialog is currently open
  type: 'node' | 'edge' | 'background' | null // Type of item being edited
  title: string // Title of the dialog
  itemId: string | null // ID of the item being edited
  settings: Record<string, any> // Settings for the item
  logic: LogicState // Logic-related data for the item
  localItem: CustomNode | CustomEdge | null // The actual node or edge being edited
  output: any // Output data associated with the item
}
