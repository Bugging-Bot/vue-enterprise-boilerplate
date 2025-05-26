/**
 * Provides actions for handling drawer item interactions
 * @param activeView - The current active view
 * @param activeTab - The current active tab
 * @param workflowName - The name of the current workflow
 * @returns An object with methods for handling drawer item actions
 */
import { useEventBusStore } from '@/stores/eventBus'
import type { DrawerItemType } from '../configs/types'

export function useDrawerActions(
  activeView: { value: string },
  activeTab: { value: string },
  workflowName: { value: string }
) {
  const eventBus = useEventBusStore()

  const handleItemAction = (action: string, item?: DrawerItemType) => {
    console.log('Action triggered:', action)

    // Don't trigger click action for draggable items during drag
    if (item?.draggable && action === 'drag-node') {
      return
    }

    // Emit an event with the action to be handled by the appropriate component
    eventBus.emit('drawer-action', {
      action,
      view: activeView.value,
      tab: activeTab.value,
      item: item,
      workflowName: workflowName.value
    })
  }

  return {
    handleItemAction
  }
}
