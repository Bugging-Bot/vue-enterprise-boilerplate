/**
 * Represents a single item in a drawer configuration.
 * @property {string} title - The display title of the drawer item.
 * @property {string} icon - The icon associated with the drawer item.
 * @property {string} action - The action triggered by the drawer item.
 * @property {boolean} [draggable] - Optional flag to indicate if the item is draggable.
 * @property {string} [nodeType] - Optional node type for Vue Flow integration.
 */

/**
 * Defines the configuration for a drawer section.
 * @property {string} title - The title of the drawer configuration.
 * @property {DrawerItemType[]} items - List of items in the drawer.
 * @property {boolean} [showWorkflowNameInput] - Optional flag to show workflow name input.
 * @property {string} [description] - Optional description for the section.
 */
export interface DrawerConfigType {
  title: string
  items: DrawerItemType[]
  showWorkflowNameInput?: boolean // Show workflow name input
  description?: string // Optional description for the section
}

/**
 * Represents a mapping of tab names to their drawer configurations.
 * @property {Object.<string, DrawerConfigType>} - Key-value pairs of tab names and their configurations.
 */
export interface ViewConfigType {
  [tabName: string]: DrawerConfigType
}

/**
 * Defines the overall local drawer configurations.
 * @property {Object.<string, ViewConfigType>} - Key-value pairs of view names and their tab configurations.
 */
export interface LocalDrawerConfigType {
  [viewName: string]: ViewConfigType
}
// Shared type definitions for drawer configurations

export interface DrawerItemType {
  title: string
  icon: string
  action: string
  draggable?: boolean // For drag-and-drop items
  nodeType?: string // For Vue Flow node types
}
