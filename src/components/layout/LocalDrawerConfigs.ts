// This file holds configurations for the Local drawer across different views

// Type definitions for better type safety
interface DrawerItem {
  title: string
  icon: string
  action: string
}

interface DrawerConfig {
  title: string
  items: DrawerItem[]
}

interface ViewConfig {
  [tabName: string]: DrawerConfig
}

// Main configuration object organized by view and tab
export const LocalDrawerConfigs: {
  [viewName: string]: ViewConfig
} = {
  // ProcessBuilderView configurations
  ProcessBuilderView: {
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
    },
    // added this for the builder right navigation bar
    // this is the place where options need to be added
    builder: {
      title: 'Builder Options',
      items: [
        { title: 'View workflow', icon: 'mdi-eye', action: 'view-diagram' },
        { title: 'Save workflow', icon: 'mdi-content-save', action: 'save-diagram' },
        { title: 'Export workflow', icon: 'mdi-file-export', action: 'export-worflow' }
      ]
    }
  },

  // HomeView configurations
  HomeView: {
    overview: {
      title: 'Home Overview',
      items: [
        {
          title: 'Dashboard Settings',
          icon: 'mdi-view-dashboard-edit',
          action: 'dashboard-settings'
        },
        { title: 'Refresh Data', icon: 'mdi-refresh', action: 'refresh-data' },
        { title: 'Export Report', icon: 'mdi-file-export', action: 'export-report' }
      ]
    },
    parts: {
      title: 'Home Parts',
      items: [
        { title: 'Parts Overview', icon: 'mdi-format-list-bulleted', action: 'parts-overview' },
        { title: 'Order Parts', icon: 'mdi-cart-plus', action: 'order-parts' }
      ]
    },
    process: {
      title: 'Process Controls',
      items: [
        { title: 'Start Process', icon: 'mdi-play', action: 'start-process' },
        { title: 'Stop Process', icon: 'mdi-stop', action: 'stop-process' },
        { title: 'Process Settings', icon: 'mdi-cog', action: 'process-settings' }
      ]
    },
    deals: {
      title: 'Deals Management',
      items: [
        { title: 'New Deal', icon: 'mdi-plus-circle', action: 'new-deal' },
        { title: 'Deal Analytics', icon: 'mdi-chart-line', action: 'deal-analytics' },
        { title: 'Export Deals', icon: 'mdi-export', action: 'export-deals' }
      ]
    }
  },

  // MessageView configurations
  MessageView: {
    default: {
      title: 'Message Options',
      items: [
        { title: 'New Message', icon: 'mdi-email-plus', action: 'new-message' },
        { title: 'Archive', icon: 'mdi-archive', action: 'archive-messages' },
        { title: 'Filter Messages', icon: 'mdi-filter', action: 'filter-messages' },
        { title: 'Settings', icon: 'mdi-cog', action: 'message-settings' }
      ]
    }
  },

  // SimulationView configurations
  SimulationView: {
    default: {
      title: 'Simulation Controls',
      items: [
        { title: 'Start Simulation', icon: 'mdi-play', action: 'start-simulation' },
        { title: 'Pause Simulation', icon: 'mdi-pause', action: 'pause-simulation' },
        { title: 'Reset Simulation', icon: 'mdi-restart', action: 'reset-simulation' },
        { title: 'Simulation Settings', icon: 'mdi-tune', action: 'simulation-settings' },
        { title: 'Export Results', icon: 'mdi-export', action: 'export-results' }
      ]
    }
  }
}
