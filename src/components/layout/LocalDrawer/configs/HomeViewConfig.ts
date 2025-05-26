/**
 * Configuration for the Home view in the local drawer navigation.
 * Defines sections and menu items for different aspects of the application.
 *
 * @remarks
 * Includes configurations for:
 * - Overview: Dashboard and general settings
 * - Parts: Parts management quick access
 * - Process: Process control and monitoring
 * - Deals: Business deals management and analytics
 *
 * @type {ViewConfigType}
 */
import type { ViewConfigType } from './types'

export const HomeViewConfig: ViewConfigType = {
  overview: {
    title: 'Home Overview',
    description: 'Dashboard and general settings',
    items: [
      {
        title: 'Dashboard Settings',
        icon: 'mdi-view-dashboard-edit',
        action: 'dashboard-settings'
      },
      { title: 'Refresh Data', icon: 'mdi-refresh', action: 'refresh-data' },
      { title: 'Export Report', icon: 'mdi-file-export', action: 'export-report' },
      { title: 'System Status', icon: 'mdi-heart-pulse', action: 'system-status' }
    ]
  },

  parts: {
    title: 'Home Parts',
    description: 'Quick access to parts management',
    items: [
      { title: 'Parts Overview', icon: 'mdi-format-list-bulleted', action: 'parts-overview' },
      { title: 'Order Parts', icon: 'mdi-cart-plus', action: 'order-parts' },
      { title: 'Low Stock Alert', icon: 'mdi-alert-circle', action: 'low-stock-alert' }
    ]
  },

  process: {
    title: 'Process Controls',
    description: 'Monitor and control processes',
    items: [
      { title: 'Start Process', icon: 'mdi-play', action: 'start-process' },
      { title: 'Stop Process', icon: 'mdi-stop', action: 'stop-process' },
      { title: 'Process Settings', icon: 'mdi-cog', action: 'process-settings' },
      { title: 'Process History', icon: 'mdi-history', action: 'process-history' }
    ]
  },

  deals: {
    title: 'Deals Management',
    description: 'Manage business deals and analytics',
    items: [
      { title: 'New Deal', icon: 'mdi-plus-circle', action: 'new-deal' },
      { title: 'Deal Analytics', icon: 'mdi-chart-line', action: 'deal-analytics' },
      { title: 'Export Deals', icon: 'mdi-export', action: 'export-deals' },
      { title: 'Deal Pipeline', icon: 'mdi-pipe', action: 'deal-pipeline' }
    ]
  }
}
