/**
 * Centralized configuration for local drawer views across the application.
 * Combines configurations for different views like Process Builder, Home, Message, and Simulation.
 *
 * @type {LocalDrawerConfigType} - A constant object mapping view names to their specific configurations
 * @exports LocalDrawerConfig - The main configuration object
 * @exports Individual view configuration objects for direct access
 * @exports Type definitions related to drawer configurations
 */
//import type { LocalDrawerConfigsType } from './types'
import { ProcessBuilderViewConfig } from './ProcessBuilderViewConfig'
import { HomeViewConfig } from './HomeViewConfig'
import { MessageViewConfig } from './MessageViewConfig'
import { SimulationViewConfig } from './SimulationViewConfig'
import { LocalDrawerConfig } from './LocalDrawerConfig'

// Export individual configs for direct access if needed
export {
  ProcessBuilderViewConfig,
  HomeViewConfig,
  MessageViewConfig,
  SimulationViewConfig,
  LocalDrawerConfig
}

// Export types
export type {
  DrawerItemType,
  DrawerConfigType,
  ViewConfigType,
  LocalDrawerConfigType
} from './types'
