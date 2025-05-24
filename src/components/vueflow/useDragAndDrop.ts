export default function useDragAndDrop() {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', nodeType)
      event.dataTransfer.effectAllowed = 'move'
    }
  }

  return {
    onDragStart
  }
}
