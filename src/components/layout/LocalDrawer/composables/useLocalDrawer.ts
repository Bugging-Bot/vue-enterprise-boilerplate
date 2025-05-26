/**
 * Composable for managing a local drawer's state and interactions
 *
 * @returns {Object} An object containing drawer state and methods
 * @property {Ref<boolean>} localDrawer - Reactive state of the drawer
 * @property {Function} toggleDrawer - Toggles the drawer open/closed
 * @property {Function} openDrawer - Opens the drawer
 * @property {Function} closeDrawer - Closes the drawer
 * @property {Function} handleToggleLocalDrawer - Handles drawer toggle events
 * @property {Function} emitIconChange - Emits icon change event via event bus
 */
import { ref } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'

export function useLocalDrawer() {
  const localDrawer = ref(false)
  const eventBus = useEventBusStore()

  const toggleDrawer = () => {
    localDrawer.value = !localDrawer.value
    emitIconChange()
  }

  const openDrawer = () => {
    localDrawer.value = true
    emitIconChange()
  }

  const closeDrawer = () => {
    localDrawer.value = false
    emitIconChange()
  }

  const emitIconChange = () => {
    eventBus.emit(
      'local-drawer-icon-change',
      localDrawer.value ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
    )
  }

  const handleToggleLocalDrawer = (data: { message?: string }) => {
    console.log('Received event:', data)
    if (data?.message) {
      toggleDrawer()
    }
  }

  return {
    localDrawer,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    handleToggleLocalDrawer,
    emitIconChange
  }
}
