<template>
  <div ref="paperContainerEl" id="paper-container">
    <Generator ref="generatorRef" :position="{ x: 350, y: 150 }" />
    <Bulb :position="{ x: 750, y: 150 }" :watts="100" />
    <Bulb :position="{ x: 750, y: 300 }" :watts="40" />
  </div>
  <div id="power-input-container">
    <label for="power-input">Power</label>
    <input ref="playbackRateEl" type="range" id="power-input" min="0" max="4" step="0.1" />
    <output ref="playbackRateOutputEl" id="power-output" for="power-input"></output>
  </div>
  <a target="_blank" href="https://www.jointjs.com">
    <img
      id="logo"
      src="https://assets.codepen.io/7589991/jointjs-logo.svg"
      width="200"
      height="50"
    />
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { dia, shapes } from 'jointjs'
import Generator from './GeneratorComp.vue'
//import Generator from './components/GeneratorComp.vue'
import Bulb from './BulbComp.vue'
import Wire from './WireComp.vue'

const paperContainerEl = ref<HTMLElement | null>(null)
const playbackRateEl = ref<HTMLInputElement | null>(null)
const playbackRateOutputEl = ref<HTMLOutputElement | null>(null)
const generatorRef = ref<InstanceType<typeof Generator> | null>(null)

let graph: dia.Graph | null = null
let paper: dia.Paper | null = null

onMounted(() => {
  if (
    !paperContainerEl.value ||
    !playbackRateEl.value ||
    !playbackRateOutputEl.value ||
    !generatorRef.value
  )
    return

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

  const generator = generatorRef.value.element
  const bulbs = graph.getCells().filter((cell) => cell.get('type') === 'Bulb')

  const wire1 = new Wire({ source: { id: generator.id }, target: { id: bulbs[0].id } })
  const wire2 = new Wire({ source: { id: generator.id }, target: { id: bulbs[1].id } })

  graph.addCells([generator, wire1, wire2])

  // Set Power Playback Rate
  function setPlaybackRate(playbackRate: number) {
    if (!generatorRef.value || !playbackRateEl.value || !playbackRateOutputEl.value) return
    generatorRef.value.setPower(playbackRate)
    playbackRateEl.value.value = playbackRate.toString()
    playbackRateOutputEl.value.textContent = `${playbackRate} x`
  }

  // Handle Power Slider Input
  playbackRateEl.value.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement
    setPlaybackRate(parseFloat(target.value))
  })

  paper.on('element:power:click', ({ model }: { model: dia.Element }, evt: Event) => {
    evt.stopPropagation()
    const playbackRate = model.get('power') ? 0 : 1
    setPlaybackRate(playbackRate)
  })

  setPlaybackRate(1)
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

<style scoped lang="scss">
#paper-container {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: scroll;
}

#power-input-container {
  position: absolute;
  font-family: sans-serif;
  font-size: 20px;
  border: 1px solid lightgray;
  background: white;
  padding: 5px 10px;
  border-radius: 3px;

  output {
    display: inline-block;
    width: 50px;
    text-align: right;
  }
}

#logo {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  padding: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
}
</style>
