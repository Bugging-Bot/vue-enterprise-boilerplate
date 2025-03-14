<!-- This is charting template for replicating again and again -->

<template>
  <div ref="paperContainer" style="width: 100%; height: 100%; border: 2px solid red"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GenericShape } from '@/components/JointJs/shape/GenericShape'
import { dia, shapes } from 'jointjs'

// // Declare the paper variable that will hold the Paper instance (but don't pass the `el` yet), as it can be use in OnMounted hook
let genericPaper: dia.Paper | null = null

// namespace contains all the objects that you will use to build your diagrams
// this contains list of out of box shapes and custome shapes like GenericShape
const genericNamespace = { ...shapes, GenericShape }

// dia.Graph is the model holding all cells (elements and links) of the diagram. (ref: https://docs.jointjs.com/api/dia/Graph/)
// In this we are using namespace created above
const genericGraph = new dia.Graph({}, { cellNamespace: genericNamespace })

//// Declare a ref for the paper container
const paperContainer = ref<HTMLElement | null>(null)

// Paper transforms an ordinary <div> HTML element into an interactive diagram area.
// joint.dia.Paper is the view for the joint.dia.Graph model. (ref: https://docs.jointjs.com/api/dia/Paper/)

// Creating custom shape Bulb
const Bulb1 = new GenericShape({
  position: { x: 550, y: 250 },
  size: { width: 100, height: 200 }, //custom size of shape, but this changes the position of label
  svgPath:
    'M16 27H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 28 7 28h9c0.276 0 0.5-0.224 0.5-0.5S16.276 27 16 27z M16.5 29.5c0-0.276-0.224-0.5-0.5-0.5H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 30 7 30h9 C16.276 30 16.5 29.776 16.5 29.5z M9 31c-0.276 0-0.5 0.224-0.5 0.5S8.724 32 9 32h5c0.276 0 0.5-0.224 0.5-0.5S14.276 31 14 31H9z M17 25.5v-0.611c0-2.534 0.926-5.049 2.677-7.274c1.52-1.93 2.323-4.245 2.323-6.697 C22 4.897 17.065 0 11 0c-0.415 0-0.838 0.023-1.255 0.069c-4.872 0.536-8.92 4.41-9.625 9.212 c-0.495 3.374 0.566 6.709 2.913 9.15C4.946 20.423 6 22.897 6 25.398V25.5C6 25.776 6.224 26 6.5 26h10 C16.776 26 17 25.776 17 25.5z M9 14H7.25c-0.965 0-1.75-0.893-1.75-1.84s0.785-1.779 1.75-1.779S9 11.09 9 12.037V14z M12 25h-2 V15h2V25z M16 25h-3V15h1.75c1.517 0 2.75-1.341 2.75-2.84s-1.233-2.779-2.75-2.779S12 10.538 12 12.037V14h-2v-1.963 c0-1.499-1.233-2.718-2.75-2.718S4.5 10.661 4.5 12.16S5.733 15 7.25 15H9v10H6.992c-0.105-2.623-1.246-5.188-3.238-7.262 C1.623 15.521 0.66 12.492 1.11 9.426C1.75 5.067 5.428 1.55 9.854 1.063C15.898 0.391 21 5.075 21 10.917 c0 2.226-0.729 4.327-2.108 6.078C17 19.399 16 22.128 16 24.889V25z M13 14v-1.963c0-0.947 0.785-1.718 1.75-1.718 s1.75 0.893 1.75 1.84S15.715 14 14.75 14H13z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: '60 Watt',
  labelFontSize: 14,
  labelPosition: { x: 42, y: 80 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Bulb2 = new GenericShape({
  position: { x: 550, y: 450 },
  size: { width: 100, height: 200 }, //custom size of shape, but this changes the position of label
  svgPath:
    'M16 27H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 28 7 28h9c0.276 0 0.5-0.224 0.5-0.5S16.276 27 16 27z M16.5 29.5c0-0.276-0.224-0.5-0.5-0.5H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 30 7 30h9 C16.276 30 16.5 29.776 16.5 29.5z M9 31c-0.276 0-0.5 0.224-0.5 0.5S8.724 32 9 32h5c0.276 0 0.5-0.224 0.5-0.5S14.276 31 14 31H9z M17 25.5v-0.611c0-2.534 0.926-5.049 2.677-7.274c1.52-1.93 2.323-4.245 2.323-6.697 C22 4.897 17.065 0 11 0c-0.415 0-0.838 0.023-1.255 0.069c-4.872 0.536-8.92 4.41-9.625 9.212 c-0.495 3.374 0.566 6.709 2.913 9.15C4.946 20.423 6 22.897 6 25.398V25.5C6 25.776 6.224 26 6.5 26h10 C16.776 26 17 25.776 17 25.5z M9 14H7.25c-0.965 0-1.75-0.893-1.75-1.84s0.785-1.779 1.75-1.779S9 11.09 9 12.037V14z M12 25h-2 V15h2V25z M16 25h-3V15h1.75c1.517 0 2.75-1.341 2.75-2.84s-1.233-2.779-2.75-2.779S12 10.538 12 12.037V14h-2v-1.963 c0-1.499-1.233-2.718-2.75-2.718S4.5 10.661 4.5 12.16S5.733 15 7.25 15H9v10H6.992c-0.105-2.623-1.246-5.188-3.238-7.262 C1.623 15.521 0.66 12.492 1.11 9.426C1.75 5.067 5.428 1.55 9.854 1.063C15.898 0.391 21 5.075 21 10.917 c0 2.226-0.729 4.327-2.108 6.078C17 19.399 16 22.128 16 24.889V25z M13 14v-1.963c0-0.947 0.785-1.718 1.75-1.718 s1.75 0.893 1.75 1.84S15.715 14 14.75 14H13z', // Example path
  fill: '#ffcc00',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: '60 Watt',
  labelFontSize: 14,
  labelPosition: { x: 42, y: 80 },
  AssetTrackingID: 'Bedroom Light',
  SN: 'Philips-01'
})

const Generator = new GenericShape({
  position: { x: 150, y: 250 },
  size: { width: 100, height: 200 }, //custom size of shape, but this changes the position of label
  svgPath:
    'm60 11h-5V9h4V2h2v8a1 1 0 01-1 1zm-22 2h2v5h-2zm14 0h2v5h-2zM2 18h60v40H2zm0 36h60v4H2zm10 4v4H4v-4zm48 0v4h-8v-4zM34 22h24v32H34zm-22 0h18v32H12zm0 13h6v4h-6zM2 53h60v2H2zM37 45h18v2H37zm0 4h18v2H37zM16 26h10v6H16zm-1 19h12v2H15zm0-4h12v2H15zm0 8h4v2h-4zm8 0h4v2h-4zM37 7h18v6H37zm23 4h-5V9h4V2h2v8a1 1 0 01-1 1z', // Example path
  fill: '#5b81ab',
  stroke: '#333333',
  strokeWidth: 0.5,
  label: 'Generator 100KVA',
  labelFontSize: 14,
  labelPosition: { x: 110, y: 130 },
  AssetTrackingID: 'Society Generator',
  SN: 'Cummins-100KVA'
})

// Creating custom shape Generator

// Function to create a shape and add it to the graph
const createShape = () => {
  genericGraph.addCell(Bulb1) // Add the shape to the graph
  genericGraph.addCell(Bulb2)
  genericGraph.addCell(Generator) // Add the shape to the graph
}

// Initialize the Paper and add shapes once the component is mounted
onMounted(() => {
  //  Ensure paperContainer.value is not null before initializing Paper
  if (paperContainer.value) {
    // get width of paprent container
    const containerWidth = paperContainer.value.offsetWidth // can try with paperContainer.value.clientWidth
    const containerHeight = paperContainer.value.offsetHeight
    console.log('containerWidth', containerWidth)
    console.log('containerHeight', containerHeight)
    // Initialize the JointJS paper after the component has been mounted
    const genericPaper = new dia.Paper({
      model: genericGraph,
      width: containerWidth,
      height: containerHeight,
      background: { color: '#F5F5F5' },
      cellViewNamespace: genericNamespace,
      el: paperContainer.value, // Pass the ref here, which is guaranteed to be non-null
      async: true
    })
    console.log('Paper Container initialize in Onmounted')

    createShape() // Create and add shape after paper is ready
    console.log('mounted custom chart')
  }
})

onUnmounted(() => {
  // Clean up the paper when the component is unmounted
  // Cleanup when the component is unmounted
  if (genericPaper) {
    genericPaper.remove() // Remove the paper instance
    genericPaper = null
  }
  if (genericGraph) {
    genericGraph.clear() // Clear the graph (removes all shapes)
    //genericGraph = null
  }
})
</script>

<style scoped>
/* Ensure paperContainer has a well-defined size */
#paperContainer {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  right: 5px;
  top: 5px;
  left: 5px;
  bottom: 5px;
  overflow: auto;
}
</style>
