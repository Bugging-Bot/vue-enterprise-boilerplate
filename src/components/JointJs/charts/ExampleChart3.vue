<!-- This is charting for Make Sourdough Loaf -->

<template>
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CreateShape } from '@/components/JointJs/composables/ShapeFactory'
import { CreateLink } from '../composables/LinkFactory'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '../composables/LayoutFactory'
import colorConfig from '../shape/colors-config.json'
import { connect, StringCodec } from 'nats'
import type { NatsConnection } from 'nats'

// Create a ref for the container
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper
let graph: joint.dia.Graph
let object1: joint.dia.Element
let natsConnection: NatsConnection | null = null

// NATS configuration
interface NATSConfig {
  serverUrl: string
  topic: string
  username: string
  password: string
}

const natsConfig: NATSConfig = {
  serverUrl: 'nats://localhost:4222',
  topic: 'f.1.p.1.m.1.s.1.t', // Topic for temperature data
  username: 'sys_user',
  password: 'Sys_P@ss'
}

let customAttributesOfShape = {
  SN: 'Mouldy'
}

let customAttributesOfLink = {
  SN: 'Mouldy'
}

// Function to get color based on temperature
const getColorForTemperature = (temperature: number): string => {
  const thermometerColors = colorConfig.Thermometer

  // Default color if no match is found
  let color = '#CCCCCC'

  // Find the appropriate color based on temperature
  for (let i = thermometerColors.length - 1; i >= 0; i--) {
    if (temperature >= thermometerColors[i].temperature) {
      color = thermometerColors[i].color
      break
    }
  }

  return color
}

// Function to update shape color
const updateShapeColor = (temperature: number) => {
  if (object1 && graph) {
    const color = getColorForTemperature(temperature)

    // Update the fill color of the shape
    object1.attr('body/fill', color)
    console.log(`Updated shape color to ${color} for temperature ${temperature}°C`)
  }
}

// Reusing the createNATSSubscriber function with a callback for temperature updates
async function createNATSSubscriber(
  config: NATSConfig,
  onMessageReceived: (message: string) => void
): Promise<void> {
  try {
    // For browser development, use a mock implementation
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log(`Simulating subscription to topic: ${config.topic}`)

      // Simulate receiving temperature updates every 3 seconds
      const simulateTemperatureUpdates = () => {
        // Generate random temperatures between 5 and 55 degrees
        const randomTemp = Math.floor(Math.random() * 50) + 5
        console.log(`Received simulated temperature: ${randomTemp}°C`)
        onMessageReceived(randomTemp.toString())
      }

      // Initial update
      simulateTemperatureUpdates()

      // Set interval for updates
      const intervalId = setInterval(simulateTemperatureUpdates, 3000)

      // Store interval ID for cleanup
      onUnmounted(() => {
        clearInterval(intervalId)
      })

      return
    }

    // For production or if we can connect to NATS
    // Connect to the NATS server with authentication
    natsConnection = await connect({
      servers: [config.serverUrl],
      user: config.username,
      pass: config.password
    })

    // Create a StringCodec to decode the messages
    const sc = StringCodec()

    // Subscribe to the specified topic
    const sub = natsConnection.subscribe(config.topic)

    console.log(`Subscribed to topic: ${config.topic}`)

    // Process messages in the background
    ;(async () => {
      for await (const msg of sub) {
        // Decode the message and pass to callback
        const message = sc.decode(msg.data)
        console.log(`Received message: ${message}`)
        onMessageReceived(message)
      }
    })()
  } catch (error) {
    console.error('Error connecting to NATS or subscribing:', error)

    // Fall back to simulation in case of error
    if (typeof window !== 'undefined') {
      console.log('Falling back to simulated data')

      // Simulate receiving temperature updates every 3 seconds
      const simulateTemperatureUpdates = () => {
        // Generate random temperatures between 5 and 55 degrees
        const randomTemp = Math.floor(Math.random() * 50) + 5
        console.log(`Received simulated temperature: ${randomTemp}°C`)
        onMessageReceived(randomTemp.toString())
      }

      // Initial update
      simulateTemperatureUpdates()

      // Set interval for updates
      const intervalId = setInterval(simulateTemperatureUpdates, 3000)

      // Store interval ID for cleanup
      onUnmounted(() => {
        clearInterval(intervalId)
      })
    }
  }
}

// Initialize the Paper and add shapes once the component is mounted
onMounted(() => {
  if (paperContainer.value) {
    // Initialize the paper and graph using CreateLayout
    const result = CreateLayout(
      paperContainer.value, // Pass the DOM element reference
      800, // Default width if container width is not available
      600, // Default height if container height is not available
      10 // Grid size (10px)
    )

    // Store the paper and graph references
    paper = result.paper
    graph = result.graph

    // Add shapes to the graph
    object1 = CreateShape(
      { x: 250, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Shape 2',
      { x: 35, y: 45 },
      getColorForTemperature(20), // Default color for 20°C
      customAttributesOfShape,
      graph
    )

    const object2 = CreateShape(
      { x: 450, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Shape 2',
      { x: 35, y: 45 },
      'transparent',
      customAttributesOfShape,
      graph
    )

    CreateLink(object1, object2, 'Link', customAttributesOfLink, graph)

    // Initialize NATS subscriber with a callback to handle temperature updates
    createNATSSubscriber(natsConfig, (message) => {
      try {
        const temperature = parseFloat(message)
        if (!isNaN(temperature)) {
          updateShapeColor(temperature)
        }
      } catch (error) {
        console.error('Error parsing temperature value:', error)
      }
    })
  }
})

onUnmounted(() => {
  // Clean up resources when component is unmounted
  if (paper && graph) {
    CleanGraph(paper, graph)
  }

  // Close NATS connection if it exists
  if (natsConnection) {
    natsConnection.close()
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
