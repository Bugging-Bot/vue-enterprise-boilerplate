<!-- /** * Renders a generic chart component using the JointJS library. * The component initializes a
JointJS graph and paper, and defines a custom 'Bulb' element that is added to the graph. * The
component is mounted and unmounted properly to manage the lifecycle of the JointJS objects. */ -->
<!-- code generated from ChatGpt-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { dia, shapes, util } from 'jointjs'

const paperContainerEl = ref<HTMLElement | null>(null)

let graph: dia.Graph | null = null
let paper: dia.Paper | null = null

onMounted(() => {
  if (!paperContainerEl.value) return

  // Initialize Graph
  graph = new dia.Graph({}, { cellNamespace: shapes })

  // Initialize Paper
  paper = new dia.Paper({
    model: graph,
    el: paperContainerEl.value,
    width: '100%',
    height: '100%',
    async: true,
    sorting: dia.Paper.sorting.APPROX,
    background: { color: '#F3F7F6' },
    interactive: { linkMove: false },
    defaultAnchor: { name: 'perpendicular' },
    defaultConnectionPoint: { name: 'anchor' }
  })

  // Define Bulb
  class Bulb extends dia.Element {
    defaults() {
      return {
        ...super.defaults,
        type: 'Bulb',
        size: { width: 96, height: 100 },
        attrs: {
          glass: {
            fill: '#f1f5f7',
            stroke: '#659db3',
            //refD: 'M 14 0 C 3 0 -3 12 1 21 C 2 23 4 24 6 25 L 6 32 L 22 32 L 22 25 C 31 19 30 6 20 1 C 18 0 16 0 14 0 Z'
            refD: 'M16 27H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 28 7 28h9c0.276 0 0.5-0.224 0.5-0.5S16.276 27 16 27z M16.5 29.5c0-0.276-0.224-0.5-0.5-0.5H7c-0.276 0-0.5 0.224-0.5 0.5S6.724 30 7 30h9 C16.276 30 16.5 29.776 16.5 29.5z M9 31c-0.276 0-0.5 0.224-0.5 0.5S8.724 32 9 32h5c0.276 0 0.5-0.224 0.5-0.5S14.276 31 14 31H9z M17 25.5v-0.611c0-2.534 0.926-5.049 2.677-7.274c1.52-1.93 2.323-4.245 2.323-6.697 C22 4.897 17.065 0 11 0c-0.415 0-0.838 0.023-1.255 0.069c-4.872 0.536-8.92 4.41-9.625 9.212 c-0.495 3.374 0.566 6.709 2.913 9.15C4.946 20.423 6 22.897 6 25.398V25.5C6 25.776 6.224 26 6.5 26h10 C16.776 26 17 25.776 17 25.5z M9 14H7.25c-0.965 0-1.75-0.893-1.75-1.84s0.785-1.779 1.75-1.779S9 11.09 9 12.037V14z M12 25h-2 V15h2V25z M16 25h-3V15h1.75c1.517 0 2.75-1.341 2.75-2.84s-1.233-2.779-2.75-2.779S12 10.538 12 12.037V14h-2v-1.963 c0-1.499-1.233-2.718-2.75-2.718S4.5 10.661 4.5 12.16S5.733 15 7.25 15H9v10H6.992c-0.105-2.623-1.246-5.188-3.238-7.262 C1.623 15.521 0.66 12.492 1.11 9.426C1.75 5.067 5.428 1.55 9.854 1.063C15.898 0.391 21 5.075 21 10.917 c0 2.226-0.729 4.327-2.108 6.078C17 19.399 16 22.128 16 24.889V25z M13 14v-1.963c0-0.947 0.785-1.718 1.75-1.718 s1.75 0.893 1.75 1.84S15.715 14 14.75 14H13z'
          },
          label: {
            textAnchor: 'middle',
            x: 'calc(w / 2)',
            y: 'calc(h / 2)',
            fontSize: 7
          }
        },
        markup: [
          {
            tagName: 'path',
            selector: 'glass'
          },
          {
            tagName: 'text',
            selector: 'label'
          }
        ]
      }
    }
    static create(watts = 100) {
      return new this({ watts, attrs: { label: { text: `${watts} W` } } })
    }
  }

  const bulb1 = Bulb.create(100).position(750, 150)
  graph.addCells([bulb1])
})

onUnmounted(() => {
  if (paper) {
    paper.remove()
    paper = null
  }
  if (graph) {
    graph.clear()
    graph = null
  }
})
</script>

<template>
  <div ref="paperContainerEl" id="paper-container"></div>
</template>

<style scoped lang="scss">
#paper-container {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: scroll;
}
</style>
