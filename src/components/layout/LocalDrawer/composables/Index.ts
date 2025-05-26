//import type { LocalDrawerConfigs } from '../configs/types'
// import { ProcessBuilderViewConfig } from '../configs/ProcessBuilderViewConfig'
// import { HomeViewConfig } from '../configs/HomeViewConfig'
// import { MessageViewConfig } from '../configs/MessageViewConfig'
// import { SimulationViewConfig } from '../configs/SimulationViewConfig'

// Main configuration object that combines all view configurations
// export const LocalDrawerConfigs: LocalDrawerConfigs = {
//   ProcessBuilderView: ProcessBuilderViewConfig,
//   HomeView: HomeViewConfig,
//   MessageView: MessageViewConfig,
//   SimulationView: SimulationViewConfig
// }

// Export individual configs for direct access if needed
// export { ProcessBuilderViewConfig, HomeViewConfig, MessageViewConfig, SimulationViewConfig }

// Export types
//export type { DrawerItem, DrawerConfig, ViewConfig, LocalDrawerConfigs } from '../configs/types'

// Export all composables
export { useLocalDrawer } from './useLocalDrawer'
export { useDrawerConfig } from './useDrawerConfig'
export { useDrawerEvents } from './useDrawerEvents'
export { useWorkflowName } from './useWorkflowName'
export { useDrawerActions } from './useDrawerActions'
