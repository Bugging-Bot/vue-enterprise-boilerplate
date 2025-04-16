<!--
  Production-grade JointJS diagram component for visualizing sensor data
  Implements performance optimizations and modular design for reusability
-->
<template>
  <div class="diagram-container">
    <div ref="paperContainer" class="paper-container"></div>
    <div v-if="showLegend" class="diagram-legend">
      <h3>{{ diagramName }}</h3>
      <p>{{ diagramDescription }}</p>
      <div v-for="(legend, index) in legends" :key="index" class="legend-item">
        <span class="legend-color" :style="{ backgroundColor: legend.color }"></span>
        <span class="legend-label">{{ legend.label }}</span>
      </div>
    </div>
    <div v-if="showConnectionStatus" class="connection-status">
      <span :class="`status-${connectionStatus}`">{{ connectionStatusText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, defineProps, defineEmits } from 'vue'
import {
  subscribeToTopic,
  cleanupAllSubscriptions,
  checkPublisherExists
} from '@/components/nats/natsSubscriberService'
import { CreateShape } from '@/components/JointJs/composables/ShapeFactory'
import { CreateLink } from '../composables/LinkFactory'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '../composables/LayoutFactory'
import {
  getSensorValueColor,
  getSensorTopic
} from '@/components/JointJs/composables/chartConfiguration'

// Define props for component configuration
const props = defineProps({
  diagramConfig: {
    type: Object,
    default: () => ({
      name: 'Sensor Diagram',
      description: 'Visualization of temperature and current sensors',
      factorySetup: {
        factory_id: 1,
        production_line_id: 1,
        machine_id: 1,
        sensor_id: 1
      },
      showLegend: true,
      showConnectionStatus: true,
      width: 800,
      height: 600,
      gridSize: 10,
      readOnly: false
    })
  }
})

// Define emits for component events
const emit = defineEmits(['connection-status-change', 'data-update', 'error'])

// Create refs for component state
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper
let graph: joint.dia.Graph
let shapes: Record<string, joint.dia.Element> = {}
let links: Record<string, joint.dia.Link> = {}

// Extract configuration from props
const diagramName = computed(() => props.diagramConfig.name)
const diagramDescription = computed(() => props.diagramConfig.description)
const showLegend = computed(() => props.diagramConfig.showLegend)
const showConnectionStatus = computed(() => props.diagramConfig.showConnectionStatus)
const factorySetup = computed(() => props.diagramConfig.factorySetup)
const isReadOnly = computed(() => props.diagramConfig.readOnly)

// Reactive data for sensor values
const sensorValues = ref({
  temperature: '--',
  current: '--'
})

// Connection status tracking
const connectionStatus = ref<'connected' | 'connecting' | 'error'>('connecting')
const connectionStatusText = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return 'Connected'
    case 'connecting':
      return 'Connecting...'
    case 'error':
      return 'Connection Error'
    default:
      return 'Unknown Status'
  }
})

// Subscription status tracking
const subscriptionStatuses = ref({
  temperature: false,
  current: false
})

// Store subscription cleanup functions
const unsubscribeFunctions: (() => void)[] = []

// Computed properties for sensor value colors
const temperatureColor = computed(() =>
  getSensorValueColor('Temperature', sensorValues.value.temperature)
)
const currentColor = computed(() => getSensorValueColor('Current', sensorValues.value.current))

// Legend data
const legends = computed(() => [
  { color: '#4CAF50', label: 'Normal Temperature' },
  { color: '#FFC107', label: 'Warning Temperature' },
  { color: '#F44336', label: 'Critical Temperature' },
  { color: '#2196F3', label: 'Normal Current' },
  { color: '#FF9800', label: 'Warning Current' },
  { color: '#E91E63', label: 'Critical Current' }
])

// Custom attributes for shapes
const customAttributes = {
  temperature: { SN: 'Temperature Sensor' },
  current: { SN: 'Current Sensor' },
  link: { SN: 'Sensor Connection' }
}

// Define subscription topics
const topics = computed(() => ({
  temperature: getSensorTopic(
    factorySetup.value.factory_id,
    factorySetup.value.production_line_id,
    factorySetup.value.machine_id,
    factorySetup.value.sensor_id,
    'Temperature'
  ),
  current: getSensorTopic(
    factorySetup.value.factory_id,
    factorySetup.value.production_line_id,
    factorySetup.value.machine_id,
    factorySetup.value.sensor_id,
    'Current'
  )
}))

// Initialize subscriptions
async function initializeSubscriptions() {
  try {
    connectionStatus.value = 'connecting'
    emit('connection-status-change', 'connecting')

    // Check if publishers exist
    const temperaturePublisherExists = await checkPublisherExists(topics.value.temperature)
    const currentPublisherExists = await checkPublisherExists(topics.value.current)

    console.log(`Temperature publisher exists: ${temperaturePublisherExists}`)
    console.log(`Current publisher exists: ${currentPublisherExists}`)

    // Subscribe to temperature topic
    const tempSubscription = await subscribeToTopic(
      topics.value.temperature,
      (msg: string) => {
        sensorValues.value.temperature = msg
        emit('data-update', { sensor: 'temperature', value: msg })

        // Update shape color if it exists
        if (shapes.temperature) {
          shapes.temperature.attr('body/fill', temperatureColor.value)
        }
      },
      {
        timeout: 5000,
        retryInterval: 2000,
        maxRetries: 3
      }
    )

    // Check if temperature subscription is successful
    if (tempSubscription.subscription) {
      subscriptionStatuses.value.temperature = true
      unsubscribeFunctions.push(tempSubscription.unsubscribe)
    }

    // Subscribe to current topic
    const currentSubscription = await subscribeToTopic(
      topics.value.current,
      (msg: string) => {
        sensorValues.value.current = msg
        emit('data-update', { sensor: 'current', value: msg })

        // Update shape color if it exists
        if (shapes.current) {
          shapes.current.attr('body/fill', currentColor.value)
        }
      },
      {
        timeout: 5000,
        retryInterval: 2000,
        maxRetries: 3
      }
    )

    // Check if current subscription is successful
    if (currentSubscription.subscription) {
      subscriptionStatuses.value.current = true
      unsubscribeFunctions.push(currentSubscription.unsubscribe)
    }

    // Update connection status based on subscriptions
    if (subscriptionStatuses.value.temperature && subscriptionStatuses.value.current) {
      connectionStatus.value = 'connected'
      emit('connection-status-change', 'connected')
    } else {
      connectionStatus.value = 'error'
      emit('connection-status-change', 'error')
    }
  } catch (error) {
    console.error('Error initializing subscriptions:', error)
    connectionStatus.value = 'error'
    emit('error', error)
    emit('connection-status-change', 'error')
  }
}

// Initialize the diagram
function initializeDiagram() {
  try {
    if (!paperContainer.value) {
      console.warn('Paper container not available')
      return
    }

    // Initialize paper and graph using CreateLayout
    const result = CreateLayout(
      paperContainer.value,
      props.diagramConfig.width,
      props.diagramConfig.height,
      props.diagramConfig.gridSize
    )

    // Store paper and graph references
    paper = result.paper
    graph = result.graph

    // Apply production-grade optimizations
    if (isReadOnly.value) {
      // Make the paper read-only for production
      //paper.setInteractive(false)
      paper.options.interactive = false
    }

    // Optimize for performance
    paper.options.async = true
    paper.options.frozen = true

    // Create temperature sensor shape
    shapes.temperature = CreateShape(
      { x: 250, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Temperature',
      { x: 35, y: 45 },
      'Transparent',
      customAttributes.temperature,
      graph
    )

    // Create current sensor shape
    shapes.current = CreateShape(
      { x: 450, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Current',
      { x: 35, y: 45 },
      'Transparent',
      customAttributes.current,
      graph
    )

    // Create link between shapes
    links.sensorLink = CreateLink(
      shapes.temperature,
      shapes.current,
      'Link',
      customAttributes.link,
      graph
    )

    // Set initial colors based on computed values
    shapes.temperature.attr('body/fill', temperatureColor.value)
    shapes.current.attr('body/fill', currentColor.value)

    // Batch updates for performance
    graph.trigger('batch:start')

    // Apply any additional updates here

    // End batch updates
    graph.trigger('batch:stop')

    // Unfreeze the paper after initial rendering
    paper.options.frozen = false
  } catch (error) {
    console.error('Error initializing diagram:', error)
    emit('error', error)
  }
}

// Watch for changes in sensor values to update the diagram
watch([temperatureColor, currentColor], ([newTempColor, newCurrentColor]) => {
  if (shapes.temperature) {
    shapes.temperature.attr('body/fill', newTempColor)
  }
  if (shapes.current) {
    shapes.current.attr('body/fill', newCurrentColor)
  }
})

// Initialize the component on mount
onMounted(async () => {
  initializeDiagram()
  await initializeSubscriptions()
})

// Clean up resources when component is unmounted
onUnmounted(() => {
  // Clean up JointJS resources
  if (paper && graph) {
    CleanGraph(paper, graph)
  }

  // Clean up individual subscriptions
  unsubscribeFunctions.forEach((unsubscribe) => unsubscribe())

  // Clean up all subscriptions
  cleanupAllSubscriptions()
})
</script>

<style scoped>
.diagram-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.paper-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 4px;
  overflow: auto;
  background-color: var(--color-background-soft, #f8f9fa);
}

.diagram-legend {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 4px;
  background-color: var(--color-background, #ffffff);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.legend-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  border-radius: 4px;
}

.connection-status {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.status-connected {
  color: var(--color-success, #4caf50);
}

.status-connecting {
  color: var(--color-warning, #ffc107);
}

.status-error {
  color: var(--color-error, #f44336);
}
</style>
