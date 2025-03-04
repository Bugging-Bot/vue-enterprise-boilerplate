<!--
  SCADA View Component
  Provides a visual interface for industrial process control using JointJS
  Displays interactive elements like tanks, pumps, and valves with real-time updates
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePaper } from './composables/usePaper'
import { Tank } from './shapes'
import { addShapeToGraph } from './utils/shapeUtils'
import ShapeInfoDrawer from './components/ShapeInfoDrawer.vue'
import { dia } from 'jointjs'

const { setupPaper } = usePaper()
const showDrawer = ref(true)
//const selectedShape = ref(null)
const selectedShape = ref<dia.Element | null>(null)

onMounted(() => {
  const { graph, paper } = setupPaper('jointjs-container')

  paper.on('element:pointerclick', (elementView) => {
    selectedShape.value = elementView.model
    showDrawer.value = true
  })
})
const handleShapeAction = (action) => {
  // Handle shape actions
  if (action === 'delete' && selectedShape.value) {
    selectedShape.value.remove()
    showDrawer.value = false
    selectedShape.value = null
  }
}
</script>

<template>
  <div class="d-flex">
    <div id="jointjs-container" class="border rounded shadow-md"></div>
    <ShapeInfoDrawer
      v-model="showDrawer"
      :model-value="showDrawer"
      :selected-shape="selectedShape"
      @action="handleShapeAction"
    />
  </div>
</template>
<style scoped>
#jointjs-container {
  border: 1px solid #ddd;
  width: 800px;
  height: 500px;
  position: relative; /* Add this */
}

.d-flex {
  display: flex;
  position: relative; /* Add this */
  height: 100%; /* Add this */
}
</style>
