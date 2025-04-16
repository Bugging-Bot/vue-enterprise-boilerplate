import { CreateShape } from '@/components/JointJs/composables/ShapeFactory'
import * as joint from '@joint/core'
//import { create } from 'domain'
import { CreateLink } from '@/components/JointJs/composables/LinkFactory'
const customAttributesOfShape1 = {
  SN: 'Mouldy',
  topics: ['f.1.p.1.m.1.s.1.t', 'f.1.p.1.m.1.s.1.h'] // Array of topics for shape 1 (temperature, humidity, etc.)
}
const customAttributesOfShape2 = {
  SN: 'Mouldy',
  topics: ['f.1.p.1.m.1.s.1.t', 'f.1.p.1.m.1.s.1.h'] // Array of topics for shape 1 (temperature, humidity, etc.)
}
const customAttributesOfLink = {
  SN: 'Mouldy'
}
const shapes: { [key: string]: joint.dia.Element } = {}

// creating shapes
function createShapesInChart(graph: joint.dia.Graph) {
  // Add shapes to the graph
  shapes.obj1 = CreateShape(
    { x: 250, y: 87 },
    { width: 120, height: 350 },
    'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
    'Shape 2',
    { x: 35, y: 45 },
    'transparent', //getColorForTemperature(20), // Default color for 20°C
    customAttributesOfShape1,
    graph
  )
  // update color of the shape
  // shapes.obj1.attr('body/fill', 'transparent'), color will come from the message

  shapes.obj2 = CreateShape(
    { x: 450, y: 87 },
    { width: 120, height: 350 },
    'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
    'Shape 2',
    { x: 35, y: 45 },
    'transparent',
    customAttributesOfShape2,
    graph
  )
  // update color of the shape
  // shapes.obj1.attr('body/fill', 'transparent'), color will come from the message

  // return all shapes
  return shapes
}

// creating links
function createLinksInChart(graph: joint.dia.Graph): void {
  void CreateLink(shapes.obj1, shapes.obj2, 'Link 1', customAttributesOfLink, graph)
}

export function createShapesandLinks(graph: joint.dia.Graph) {
  void createShapesInChart(graph)
  createLinksInChart(graph)
}
