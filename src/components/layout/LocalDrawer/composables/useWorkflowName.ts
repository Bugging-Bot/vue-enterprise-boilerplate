/**
 * Manages workflow name state and related interactions for a specific view and tab.
 *
 * @param activeView - Reactive reference to the current active view
 * @param activeTab - Reactive reference to the current active tab
 * @returns An object containing workflow name state and methods for managing it
 */
import { ref, watch } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'

export function useWorkflowName(activeView: { value: string }, activeTab: { value: string }) {
  const workflowName = ref('')
  const eventBus = useEventBusStore()

  const handleWorkflowNameChange = () => {
    eventBus.emit('workflow-name-changed', {
      name: workflowName.value,
      view: activeView.value,
      tab: activeTab.value
    })
  }

  const resetWorkflowName = () => {
    workflowName.value = ''
  }

  // Watch for tab changes and reset workflow name when switching to builder
  watch(
    () => activeTab.value,
    (newTab) => {
      if (newTab === 'builder') {
        resetWorkflowName()
      }
    }
  )
  // Watch for view changes and reset workflow name
  watch(activeView, () => {
    resetWorkflowName()
  })

  return {
    workflowName,
    handleWorkflowNameChange,
    resetWorkflowName
  }
}
