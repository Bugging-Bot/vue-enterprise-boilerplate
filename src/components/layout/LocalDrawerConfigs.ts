// This file hold configurations for the Local drawer

export const LocalDrawerConfigs = {
  overview: {
    title: 'Diagram Options',
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
    items: [
      { title: 'View Inventory', icon: 'mdi-clipboard-list', action: 'view-inventory' },
      { title: 'Add New Part', icon: 'mdi-plus-circle', action: 'add-part' },
      { title: 'Filter Parts', icon: 'mdi-filter', action: 'filter-parts' },
      { title: 'Export List', icon: 'mdi-export', action: 'export-parts' }
    ]
  }
}
