/**
 * Context menu management utilities for shape interactions
 * Handles context menu positioning and actions for shapes
 */

import { dia } from 'jointjs'

interface ContextMenuPosition {
  x: number
  y: number
}

interface ContextMenuState {
  isVisible: boolean
  position: ContextMenuPosition
  shapeId: string
}

/**
 * Calculates context menu position from mouse event
 */
export const getMenuPosition = (evt: MouseEvent): ContextMenuPosition => ({
  x: evt.clientX,
  y: evt.clientY
})

/**
 * Handles context menu actions for shapes
 */
export const handleContextMenuAction = (
  action: string,
  shape: dia.Element,
  graph: dia.Graph
): void => {
  switch (action) {
    case 'position':
      const pos = shape.position()
      alert(`Shape position - X: ${pos.x}, Y: ${pos.y}`)
      break
    case 'alerts':
      // Example alert info
      alert(`Alerts for shape: ${shape.id}\nStatus: Normal`)
      break
    case 'delete':
      shape.remove()
      break
  }
}
