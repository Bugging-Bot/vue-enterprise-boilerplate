/**
 * Configuration for the Simulation View, defining the default layout and actions
 * for simulation control interface.
 *
 * @property {Object} default - The default configuration for simulation controls
 * @property {string} default.title - Title of the simulation control section
 * @property {string} default.description - Description of the simulation control functionality
 * @property {Array} default.items - List of available simulation control actions
 * @property {string} default.items[].title - Display title for each action
 * @property {string} default.items[].icon - MDI icon representing the action
 * @property {string} default.items[].action - Unique identifier for the action
 */
import type { ViewConfigType } from './types'

export const SimulationViewConfig: ViewConfigType = {
  default: {
    title: 'Simulation Controls',
    description: 'Run and manage simulations',
    items: [
      { title: 'Start Simulation', icon: 'mdi-play', action: 'start-simulation' },
      { title: 'Pause Simulation', icon: 'mdi-pause', action: 'pause-simulation' },
      { title: 'Reset Simulation', icon: 'mdi-restart', action: 'reset-simulation' },
      { title: 'Simulation Settings', icon: 'mdi-tune', action: 'simulation-settings' },
      { title: 'Export Results', icon: 'mdi-export', action: 'export-results' },
      { title: 'Load Scenario', icon: 'mdi-file-import', action: 'load-scenario' },
      { title: 'Save Scenario', icon: 'mdi-content-save', action: 'save-scenario' },
      { title: 'Simulation History', icon: 'mdi-history', action: 'simulation-history' }
    ]
  }
}
