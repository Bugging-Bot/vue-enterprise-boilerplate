import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { LocalDrawerConfig } from '../configs'
import type { DrawerConfigType, LocalDrawerConfigType } from '../configs/types'

export function useDrawerConfig() {
  const route = useRoute()
  const activeView = ref(getViewNameFromRoute(route.name as string))
  const activeTab = ref('overview')

  function getViewNameFromRoute(routeName: string): string {
    if (!routeName) return 'HomeView'

    const routeToViewMap: Record<string, string> = {
      home: 'HomeView',
      'process-builder': 'ProcessBuilderView',
      messages: 'MessageView',
      simulation: 'SimulationView'
    }

    return routeToViewMap[routeName] || 'HomeView'
  }

  const currentConfig = computed((): DrawerConfigType | null => {
    const viewConfig = LocalDrawerConfig[activeView.value]
    if (!viewConfig) return null

    // For views with a single 'default' configuration
    if (viewConfig.default) {
      return viewConfig.default
    }

    // For views with multiple tabs
    return viewConfig[activeTab.value] || null
  })

  const showDragDescription = computed(() => {
    return (
      activeView.value === 'ProcessBuilderView' &&
      activeTab.value === 'builder' &&
      currentConfig.value?.items.some((item) => item.draggable)
    )
  })

  const handleTabChange = (tabValue: string) => {
    console.log('LocalDrawer received tab change:', tabValue)
    activeTab.value = tabValue
  }

  const handleViewChange = (viewName: string) => {
    console.log('LocalDrawer received view change:', viewName)
    activeView.value = viewName
    activeTab.value = 'overview'
  }

  return {
    activeView,
    activeTab,
    currentConfig,
    showDragDescription,
    handleTabChange,
    handleViewChange
  }
}
