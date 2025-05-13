// This code contain stencil to be used in the jointjs editor
import { logger } from '@/utils/logger'
import * as joint from '@joint/core'

/**
 * Initializes and renders the stencil panel inside the provided container.
 * Adds draggable shapes (rectangle and ellipse) to the panel.
 *
 * @param container - The HTML element where the stencil will be rendered
 * @param paper - The JointJS paper instance
 * @param graph - The JointJS graph instance
 */
export function createStencil(
  container: HTMLElement
  //paper: joint.dia.Paper,
  //graph: joint.dia.Graph
): void {
  logger.debug('Creating stencil...')
  // Clear existing content in the stencil container
  container.innerHTML = ''

  // Create a palette container to hold shape buttons
  const palette = document.createElement('div')
  palette.style.padding = '8px'
  palette.style.display = 'flex'
  palette.style.flexDirection = 'column'
  palette.style.gap = '10px'
  palette.style.userSelect = 'none'

  // Define base Rectangle shape
  const rectElement = new joint.shapes.standard.Rectangle()
  rectElement.resize(100, 40)
  rectElement.attr({
    body: { fill: '#ffffff' },
    label: { text: 'Rectangle', fill: '#000000' }
  })

  // Define base Ellipse shape
  const ellipseElement = new joint.shapes.standard.Ellipse()
  ellipseElement.resize(100, 50)
  ellipseElement.attr({
    body: { fill: '#f2f2f2' },
    label: { text: 'Ellipse', fill: '#111111' }
  })

  // Add these predefined shapes to stencil
  const shapes = [
    { label: 'Rectangle', element: rectElement },
    { label: 'Ellipse', element: ellipseElement }
  ]

  // Convert each shape into a draggable HTML element
  shapes.forEach(({ label, element }) => {
    const shapeDiv = createDraggableShape(label, element)
    palette.appendChild(shapeDiv)
  })

  // Append the palette to the container
  container.appendChild(palette)
}

/**
 * Creates a draggable HTML element that represents a JointJS shape.
 * When dragged, it transfers a JSON-serialized representation of the shape.
 *
 * @param label - A user-friendly name for the shape
 * @param shape - The JointJS dia.Element to associate with the label
 * @param paper - The JointJS paper instance (used for context)
 * @param graph - The JointJS graph instance (used for shape placement)
 * @returns A div element ready to be inserted into the stencil panel
 */
function createDraggableShape(label: string, shape: joint.dia.Element): HTMLElement {
  const div = document.createElement('div')
  div.textContent = label
  div.style.padding = '6px'
  div.style.border = '1px solid #ccc'
  div.style.background = '#f9f9f9'
  div.style.cursor = 'grab'
  div.style.textAlign = 'center'
  div.style.borderRadius = '4px'
  div.setAttribute('draggable', 'true')

  // On drag start, store the shape's JSON data in the dataTransfer object
  div.addEventListener('dragstart', (event: DragEvent) => {
    if (!event.dataTransfer) return

    const clone = shape.clone()
    const shapeJSON = clone.toJSON()
    event.dataTransfer.setData('application/json', JSON.stringify(shapeJSON))
  })

  return div
}

/**
 * Enables the paper area to accept drops from the stencil panel.
 * When a shape is dropped, it is deserialized and added to the graph at the drop location.
 *
 * @param paperElement - The DOM element that contains the JointJS paper
 * @param paper - The JointJS paper instance
 * @param graph - The JointJS graph instance
 */
export function enablePaperDrop(
  paperElement: HTMLElement,
  paper: joint.dia.Paper,
  graph: joint.dia.Graph
): void {
  // Allow elements to be dragged over the paper
  paperElement.addEventListener('dragover', (event: DragEvent) => {
    event.preventDefault()
  })

  // Handle drop of serialized JointJS shape
  paperElement.addEventListener('drop', (event: DragEvent) => {
    event.preventDefault()
    if (!event.dataTransfer) return

    const data = event.dataTransfer.getData('application/json')
    if (!data) return

    try {
      const shapeJSON = JSON.parse(data)

      // Attempt to get the shape type (e.g., 'standard.Rectangle')
      const type = shapeJSON.type as keyof typeof joint.shapes.standard
      // Create element based on type or default to Rectangle
      const rawElement =
        type in joint.shapes.standard
          ? new joint.shapes.standard[type]()
          : new joint.shapes.standard.Rectangle()

      // Cast to joint.dia.Element to access fromJSON safely
      const element = rawElement as joint.dia.Element
      element.set(shapeJSON)

      // Determine local paper coordinates for accurate placement
      const localPoint = paper.clientToLocalPoint({
        x: event.clientX,
        y: event.clientY
      })

      // Offset to center the shape at the drop position
      element.position(localPoint.x - 50, localPoint.y - 25)

      // Add to graph
      graph.addCell(element)
    } catch (error) {
      console.error('Failed to drop shape on paper:', error)
    }
  })
}
