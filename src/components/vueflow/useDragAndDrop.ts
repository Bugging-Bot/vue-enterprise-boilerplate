// 25-05-2025: merging flow builder with local drawer
import { ref } from 'vue'

export default function useDragAndDrop() {
  //25-05-2025: merging flow builder with local drawer
  const draggedType = ref<string | null>(null)

  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (event.dataTransfer) {
      draggedType.value = nodeType //25-05-2025: merging flow builder with local drawer
      event.dataTransfer.setData('application/vueflow', nodeType)
      event.dataTransfer.effectAllowed = 'move'
    }
  }

  //25-05-2025: merging flow builder with local drawer
  const onDragEnd = () => {
    draggedType.value = null
  }

  return {
    draggedType, //25-05-2025: merging flow builder with local drawer
    onDragStart,
    onDragEnd //25-05-2025: merging flow builder with local drawer
  }
}
