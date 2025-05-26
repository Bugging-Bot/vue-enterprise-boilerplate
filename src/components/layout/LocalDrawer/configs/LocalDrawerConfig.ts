// Main configuration object that combines all view configurations

/**
 * Combines all local drawer view configurations into a single configuration object.
 * Provides a centralized mapping of view names to their specific drawer configurations.
 *
 * @type {LocalDrawerConfigType} Configuration object for different local drawer views
 * @property {Object} ProcessBuilderView Configuration for the Process Builder view
 * @property {Object} HomeView Configuration for the Home view
 * @property {Object} MessageView Configuration for the Message view
 * @property {Object} SimulationView Configuration for the Simulation view
 */
import type { LocalDrawerConfigType } from './types'

import { ProcessBuilderViewConfig } from './ProcessBuilderViewConfig'
import { HomeViewConfig } from './HomeViewConfig'
import { MessageViewConfig } from './MessageViewConfig'
import { SimulationViewConfig } from './SimulationViewConfig'

export const LocalDrawerConfig: LocalDrawerConfigType = {
  ProcessBuilderView: ProcessBuilderViewConfig,
  HomeView: HomeViewConfig,
  MessageView: MessageViewConfig,
  SimulationView: SimulationViewConfig
}
