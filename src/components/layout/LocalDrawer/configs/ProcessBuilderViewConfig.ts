/**
 * Configuration for the Process Builder view, defining options and actions
 * across different sections of the application interface.
 *
 * @remarks
 * Contains configuration for three main sections:
 * - Overview: Diagram creation tools
 * - Parts: Inventory management options
 * - Builder: Workflow creation and management actions
 *
 * @typeParam ViewConfigType - Type defining the structure of view configuration
 */
import type { ViewConfigType } from './types'

export const ProcessBuilderViewConfig: ViewConfigType = {
  overview: {
    title: 'Diagram Options',
    description: 'Tools for building process diagrams',
    items: [
      { title: 'Add Tank', icon: 'mdi-tank', action: 'add-tank' },
      { title: 'Add Pump', icon: 'mdi-pump', action: 'add-pump' },
      { title: 'Add Valve', icon: 'mdi-valve', action: 'add-valve' },
      { title: 'Connect Elements', icon: 'mdi-connection', action: 'connect-elements' },
      { title: 'Canvas Settings', icon: 'mdi-cog-outline', action: 'canvas-settings' }
    ]
  },

  parts: {
    title: 'Parts Options',
    description: 'Manage inventory and parts',
    items: [
      { title: 'View Inventory', icon: 'mdi-clipboard-list', action: 'view-inventory' },
      { title: 'Add New Part', icon: 'mdi-plus-circle', action: 'add-part' },
      { title: 'Filter Parts', icon: 'mdi-filter', action: 'filter-parts' },
      { title: 'Export List', icon: 'mdi-export', action: 'export-parts' }
    ]
  },

  builder: {
    title: 'Workflow Builder',
    description: 'Create and manage workflows',
    showWorkflowNameInput: true,
    items: [
      {
        title: 'Input Node',
        icon: 'mdi-import',
        action: 'drag-node',
        draggable: true,
        nodeType: 'input'
      },
      {
        title: 'Process Node',
        icon: 'mdi-circle-outline',
        action: 'drag-node',
        draggable: true,
        nodeType: 'default'
      },
      {
        title: 'Output Node',
        icon: 'mdi-export',
        action: 'drag-node',
        draggable: true,
        nodeType: 'output'
      },
      { title: 'Save Workflow', icon: 'mdi-content-save', action: 'save-diagram' },
      { title: 'Export Workflow', icon: 'mdi-file-export', action: 'export-workflow' },
      { title: 'Load Workflow', icon: 'mdi-file-import', action: 'load-workflow' },
      { title: 'Clear Canvas', icon: 'mdi-delete-sweep', action: 'clear-canvas' }
    ]
  }
}
