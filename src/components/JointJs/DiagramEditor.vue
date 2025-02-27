<template>
  <!-- This div will act as the container for the JointJS Paper (canvas) -->
  <div ref="paperContainer" class="paper-container"></div>
</template>

<script setup lang="ts">
// Import necessary modules from Vue and JointJS
import { ref, onMounted } from 'vue'
import { dia, shapes } from '@joint/core'

// Declare a ref to access the DOM element where the JointJS Paper will be rendered

// This is a Vue ref that points to the div in the template
const paperContainer = ref<HTMLDivElement | null>(null)

// Use the `shapes` from JointJS to define the namespace for your shapes
const namespace = shapes

//let paper: dia.Paper | null = null

// `onMounted` lifecycle hook is used to run code after the component has been mounted in the DOM
onMounted(() => {
  // Check if the `paperContainer` element is available (this ensures the DOM is ready)
  if (paperContainer.value) {
    // Create a new graph instance from JointJS, which will hold your diagram's elements
    const graph = new dia.Graph({}, { cellNamespace: namespace })

    // Initialize the JointJS Paper (the visual part of the diagram) using the DOM element and graph model
    // Create the paper (canvas), setting the initial width and height
    new dia.Paper({
      el: paperContainer.value, // Attach the Paper to the `paperContainer` DOM element
      model: graph, // Link the Paper with the `graph` model created above
      autoResizeCanvas: true, // This will make the Paper auto-resize when cells are added or removed
      // Enable responsive scaling
      interactive: true, // Ensures interaction is enabled (drag, zoom, etc.)
      // Set size dynamically based on the container's current width and height
      //width: paperContainer.value.clientWidth, // Dynamically set the width based on the container's width
      //height: paperContainer.value.clientHeight, // Dynamically set the height based on the container's height
      width: 500, // Set the width of the Paper (canvas area)
      height: 500, // Set the height of the Paper (canvas area)
      background: { color: '#F5F5F5' }, // Set the background color of the Paper
      cellViewNamespace: namespace // Define the namespace for rendering shapes
    })

    // create elements

    // Create a new rectangle shape (an instance of the Rectangle shape from the 'standard' shapes namespace in JointJS)
    const rect1 = new shapes.standard.Rectangle()
    // Set the position of the first rectangle (x, y) on the canvas
    rect1.position(25, 25)
    // Resize the first rectangle to width 180px and height 50px
    rect1.resize(180, 50)
    // Add the first rectangle to the graph (this makes it part of the graph and renders it on the canvas)
    rect1.addTo(graph)

    // Create another new rectangle shape, similar to the first one
    const rect2 = new shapes.standard.Rectangle()
    // Set the position of the second rectangle (x, y) on the canvas
    rect2.position(95, 225)
    // Resize the second rectangle to width 180px and height 50px
    rect2.resize(180, 50)
    // Add the second rectangle to the graph
    rect2.addTo(graph)

    // Set styling and attributes for the first rectangle
    // Modify the rectangle's 'body' attribute: set the stroke (border color), and give it rounded corners (rx and ry)
    rect1.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 })
    // Set styling and attributes for the second rectangle (same as the first one)
    rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 })
    // Set the label for the first rectangle: 'Hello' as the text and set the text color to #353535
    rect1.attr('label', { text: 'Hello', fill: '#353535' })
    // Set the label for the second rectangle: 'World!' as the text and set the text color to #353535
    rect2.attr('label', { text: 'World!', fill: '#353535' })

    // create link
    const link = new shapes.standard.Link()
    link.source(rect1)
    link.target(rect2)
    link.addTo(graph)

    link.appendLabel({
      attrs: {
        text: {
          text: 'to the'
        }
      }
    })
  }
})
</script>
<style scoped>
/* Global styles for the body (to avoid margin issues) */
body {
  margin: unset;
}
/* Styling for the div element that holds the JointJS Paper */
#paper {
  margin: 50px auto 0 auto; /*Center the paper container horizontally and add margin on top*/
  width: 100%; /* Set the container width to be 100% of the parent element (you can set a specific width here) */
  height: 100%; /*Set a fixed height for the paper container (this controls the height of the canvas)*/
}
</style>
