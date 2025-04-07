/**
 * This file contains functions for adding interaction tools to graph elements (nodes).
 * These tools include remove, button, and connection tools.
 */

import * as joint from '@joint/core'

export const addElementTools = (
  element: joint.dia.Element,
  scale: number,
  paper: joint.dia.Paper | null
): void => {
  const buttonMarkup = [
    {
      tagName: 'circle',
      selector: 'button',
      attributes: { r: 7, fill: '#000000', cursor: 'pointer' }
    },
    {
      tagName: 'path',
      selector: 'icon',
      attributes: {
        d: 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
        fill: 'none',
        stroke: '#ffffff',
        'stroke-width': 2,
        'pointer-events': 'none'
      }
    }
  ]

  const removeTool = new joint.elementTools.Remove({ scale })
  const button = new joint.elementTools.Button({
    scale,
    action: () => alert('Button pressed'),
    x: 'calc(w)',
    markup: buttonMarkup
  })
  const connectTool = new joint.elementTools.Connect({
    scale,
    x: 'calc(w)',
    y: 'calc(h)',
    magnet: 'body'
  })

  if (paper) {
    element
      .findView(paper)
      .addTools(new joint.dia.ToolsView({ tools: [removeTool, button, connectTool] }))
  }
}
