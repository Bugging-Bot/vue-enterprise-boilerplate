/**
 * This file contains functions for adding interaction tools to links in the graph.
 * These tools allow manipulation of vertices, arrows, and removing the link.
 */

import * as joint from '@joint/core'

export function CreateLink(
  source: joint.dia.Element,
  target: joint.dia.Element,
  label: string,
  customAttributes: any = {},
  graph: joint.dia.Graph
): joint.dia.Link {
  const link = new joint.shapes.standard.Link({
    type: 'link', // Explicitly define the type of the link
    source: { id: source.id },
    target: { id: target.id },
    attrs: {
      line: {
        stroke: '#000',
        strokeWidth: 2,
        targetMarker: {
          type: 'path',
          d: 'M 10 -5 0 0 10 5 z'
        }
      }
    },
    labels: [
      {
        position: 0.5,
        attrs: {
          text: {
            text: label,
            fill: 'Black', // text color
            fontSize: 15,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'none'
          },
          rect: {
            fill: 'white',
            stroke: 'transparent',
            strokeWidth: 1,
            rx: 3,
            ry: 3
          }
        }
      }
    ],
    // This is the important part - providing the markup
    markup: [
      {
        tagName: 'path',
        selector: 'line',
        attributes: {
          fill: 'none',
          'pointer-events': 'none'
        }
      }
    ]
  })

  // Add custom attributes if provided
  if (customAttributes) {
    link.prop('customAttributes', customAttributes)
  }
  // creating instance of link
  graph.addCell(link)

  // adding link to the graph
  //graph.addCell(link)
  return link
}
