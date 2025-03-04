/**
 * Event handler utilities for JointJS shapes and paper interactions
 */

import { dia } from 'jointjs'
import { getMenuPosition } from './contextMenuHandler'

interface ContextMenuState {
  isVisible: boolean
  position: { x: number; y: number }
  shapeId: string
}

/**
 * Sets up event listeners for shape interactions
 * @param shape - The JointJS shape element to attach events to
 * @returns The configured shape with attached events
 */
export const setupShapeEvents = (shape: dia.Element): dia.Element => {
  // Track position changes of the shape
  shape.on('change:position', (element: dia.Element) => {
    console.log('Position changed:', element.position())
  })

  return shape
}

/**
 * Sets up event listeners for paper-level interactions
 * @param paper - The JointJS paper instance to attach events to
 */
export const setupPaperEvents = (paper: dia.Paper): void => {
  // Handle click events on any cell (shape or link) in the paper
  paper.on('cell:pointerclick', (cellView: dia.CellView) => {
    console.log('Shape clicked:', cellView.model.id)
  })

  // Additional paper events can be added here
  paper.on('blank:pointerclick', () => {
    console.log('Paper background clicked')
  })

  paper.on('element:pointerdown', (elementView: dia.ElementView) => {
    console.log('Element interaction started:', elementView.model.id)
  })
}

/**
 * Sets up context menu events for paper
 */
export const setupContextMenuEvents = (
  paper: dia.Paper,
  contextMenuState: ContextMenuState
): void => {
  // Prevent default context menu on the paper container
  paper.el.addEventListener('contextmenu', (evt: Event) => {
    evt.preventDefault()
  })

  // Handle right-click on elements
  paper.on(
    'element:contextmenu',
    (elementView: dia.ElementView, evt: JQuery.TriggeredEvent, x: number, y: number) => {
      evt.preventDefault()
      const shape = elementView.model

      contextMenuState.isVisible = true
      contextMenuState.position = getMenuPosition(evt.originalEvent as MouseEvent)
      contextMenuState.shapeId = shape.id.toString()
    }
  )

  // Close context menu on blank paper click
  paper.on('blank:pointerdown', () => {
    contextMenuState.isVisible = false
  })
}
