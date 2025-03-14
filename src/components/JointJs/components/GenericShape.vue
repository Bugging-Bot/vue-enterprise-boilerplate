<template>
  <div class="generic-shape"></div>
</template>

<script setup lang="ts">
import { dia } from 'jointjs'

interface GenericShapeProps {
  position: { x: number; y: number }
  size?: { width: number; height: number }
  svgPath: string // The SVG path (refD).
  fill?: string
  stroke?: string
  strokeWidth?: number
  label?: string
  labelFontSize?: number
}

const props = withDefaults(defineProps<GenericShapeProps>(), {
  size: () => ({ width: 100, height: 100 }),
  fill: '#FFFFFF',
  stroke: '#000000',
  strokeWidth: 1,
  label: '',
  labelFontSize: 12
})

const createGenericShapeElement = () => {
  class GenericShape extends dia.Element {
    defaults() {
      return {
        ...super.defaults,
        // change this type as per the object
        type: 'GenericShape',
        size: props.size,
        attrs: {
          body: {
            d: props.svgPath, // Use the SVG path from props.
            fill: props.fill,
            stroke: props.stroke,
            strokeWidth: props.strokeWidth
          },
          label: {
            text: props.label,
            textAnchor: 'middle',
            x: 'calc(w / 2)',
            y: 'calc(h / 2)',
            fontSize: props.labelFontSize
          }
        },
        markup: [
          {
            tagName: 'path',
            selector: 'body'
          },
          {
            tagName: 'text',
            selector: 'label'
          }
        ]
      }
    }
  }

  return new GenericShape({ position: props.position })
}

defineExpose({
  createGenericShapeElement
})
</script>

<style scoped>
.generic-shape {
  /* Generic shape styles */
  /* Example styles for the wrapper div */
  display: inline-block; /* Allows width and height to be respected */
  position: relative; /* Needed for absolute positioning of JointJS element */
  /* You might want to add more styles based on your needs */
}
</style>
