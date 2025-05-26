/**
 * Manages event subscriptions and emissions for the LocalDrawer component.
 *
 * @param handleToggleLocalDrawer Callback function to toggle the local drawer
 * @param handleTabChange Callback function to handle tab changes
 * @param handleViewChange Callback function to handle view changes
 * @param emitIconChange Callback function to emit icon changes
 * @param activeView Current active view reference
 *
 * @returns Void
 *
 * @description Sets up event listeners on component mount and cleans up on unmount,
 * handling drawer toggle, tab changes, and view changes through the event bus.
 */
import { onMounted, onUnmounted } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'

export function useDrawerEvents(
  handleToggleLocalDrawer: (data: { message?: string }) => void,
  handleTabChange: (tabValue: string) => void,
  handleViewChange: (viewName: string) => void,
  emitIconChange: () => void,
  activeView: { value: string }
) {
  const eventBus = useEventBusStore()

  onMounted(() => {
    // Subscribe to events
    eventBus.on('toggle-local-drawer', handleToggleLocalDrawer)
    eventBus.on('ProcessBuilder-tab-changed', handleTabChange)
    eventBus.on('Home-tab-changed', handleTabChange)
    eventBus.on('view-changed', handleViewChange)

    console.log('LocalDrawer subscribed to events')

    // Emit initial states
    emitIconChange()
    eventBus.emit('view-changed', activeView.value)
  })

  onUnmounted(() => {
    // Unsubscribe from events
    eventBus.offSpecific('toggle-local-drawer', handleToggleLocalDrawer)
    eventBus.offSpecific('ProcessBuilder-tab-changed', handleTabChange)
    eventBus.offSpecific('Home-tab-changed', handleTabChange)
    eventBus.offSpecific('view-changed', handleViewChange)

    console.log('LocalDrawer unsubscribed from events')
  })
}
