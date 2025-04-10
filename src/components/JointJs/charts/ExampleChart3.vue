<!-- This is charting for Make Sourdough Loaf -->

<template>
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted //, reactive
} from 'vue'
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
let object2: joint.dia.Element
let natsConnection: NatsConnection | null = null
let subscriptions: { [id: string]: any[] } = {}

// NATS configuration
interface NATSConfig {
  serverUrl: string
  username: string
  password: string
}

const natsConfig: NATSConfig = {
  serverUrl: 'nats://localhost:4222',
  username: 'sys_user',
  password: 'Sys_P@ss'
}

// Custom attributes for shapes with an array of topics
let customAttributesOfShape1 = {
  SN: 'Mouldy',
  topics: ['f.1.p.1.m.1.s.1.t', 'f.1.p.1.m.1.s.1.h'] // Array of topics for shape 1 (temperature, humidity, etc.)
}

let customAttributesOfShape2 = {
  SN: 'Mouldy',
  topics: ['f.1.p.1.m.1.s.2.t'] // Array of topics for shape 2
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
const updateShapeColor = (shape: joint.dia.Element, temperature: number) => {
  if (shape && graph) {
    const color = getColorForTemperature(temperature)

    // Update the fill color of the shape
    shape.attr('body/fill', color)
    console.log(`Updated shape ${shape.id} color to ${color} for temperature ${temperature}°C`)
  }
}

// Function to handle different types of messages based on topic pattern
const handleMessage = (shape: joint.dia.Element, topic: string, message: string) => {
  // Extract the last character of the topic to determine the type of data
  const dataType = topic.charAt(topic.length - 1)

  try {
    const value = parseFloat(message)
    if (isNaN(value)) {
      console.warn(`Received non-numeric value: ${message} for topic: ${topic}`)
      return
    }

    switch (dataType) {
      case 't': // Temperature
        updateShapeColor(shape, value)
        break
      case 'h': // Humidity
        // Handle humidity data if needed
        console.log(`Received humidity: ${value}% for shape ${shape.id}`)
        // You could change opacity, stroke width, or other attributes based on humidity
        break
      case 'p': // Pressure
        // Handle pressure data if needed
        console.log(`Received pressure: ${value} for shape ${shape.id}`)
        break
      default:
        console.log(`Received data: ${value} for topic: ${topic}, shape: ${shape.id}`)
    }
  } catch (error) {
    console.error(`Error processing message for topic ${topic}:`, error)
  }
}

// Reusing the createNATSSubscriber function with support for multiple topics
async function createNATSSubscriber(
  config: NATSConfig,
  shape: joint.dia.Element,
  customAttributes: any
): Promise<void> {
  // Get topics from shape's custom attributes
  const topics = customAttributes.topics || []

  if (topics.length === 0) {
    console.error('No topics specified in shape attributes')
    return
  }

  // Initialize subscriptions array for this shape
  subscriptions[shape.id] = []

  try {
    // For browser development, use a mock implementation
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log(`Simulating subscription to topics: ${topics.join(', ')} for shape ${shape.id}`)

      // Simulate receiving data updates every 3 seconds for each topic
      topics.forEach((topic: string) => {
        const simulateDataUpdates = () => {
          // Generate random values between 5 and 55
          const randomValue = Math.floor(Math.random() * 50) + 5
          console.log(
            `Received simulated data: ${randomValue} for topic: ${topic}, shape: ${shape.id}`
          )
          handleMessage(shape, topic, randomValue.toString())
        }

        // Initial update
        simulateDataUpdates()

        // Set interval for updates
        const intervalId = setInterval(simulateDataUpdates, 3000)

        // Store interval ID for cleanup
        subscriptions[shape.id].push(intervalId)
      })

      return
    }

    // For production or if we can connect to NATS
    // Connect to the NATS server with authentication if not already connected
    if (!natsConnection) {
      natsConnection = await connect({
        servers: [config.serverUrl],
        user: config.username,
        pass: config.password
      })
    }

    // Create a StringCodec to decode the messages
    const sc = StringCodec()

    // Subscribe to each topic
    for (const topic of topics) {
      const sub = natsConnection.subscribe(topic)

      // Store subscription for cleanup
      subscriptions[shape.id].push(sub)

      console.log(`Subscribed to topic: ${topic} for shape ${shape.id}`)

      // Process messages in the background
      ;(async () => {
        for await (const msg of sub) {
          // Decode the message
          const message = sc.decode(msg.data)
          console.log(`Received message: ${message} for topic: ${topic}, shape: ${shape.id}`)

          // Handle the message based on topic
          handleMessage(shape, topic, message)
        }
      })()
    }
  } catch (error) {
    console.error(`Error connecting to NATS or subscribing for shape ${shape.id}:`, error)

    // Fall back to simulation in case of error
    if (typeof window !== 'undefined') {
      console.log(`Falling back to simulated data for shape ${shape.id}`)

      // Simulate receiving data updates for each topic
      topics.forEach((topic: string) => {
        const simulateDataUpdates = () => {
          // Generate random values between 5 and 55
          const randomValue = Math.floor(Math.random() * 50) + 5
          console.log(
            `Received simulated data: ${randomValue} for topic: ${topic}, shape: ${shape.id}`
          )
          handleMessage(shape, topic, randomValue.toString())
        }

        // Initial update
        simulateDataUpdates()

        // Set interval for updates
        const intervalId = setInterval(simulateDataUpdates, 3000)

        // Store interval ID for cleanup
        subscriptions[shape.id].push(intervalId)
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
      customAttributesOfShape1,
      graph
    )

    object2 = CreateShape(
      { x: 450, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Shape 2',
      { x: 35, y: 45 },
      'transparent',
      customAttributesOfShape2,
      graph
    )

    CreateLink(object1, object2, 'Link', customAttributesOfLink, graph)

    // Initialize NATS subscriber for each shape with its array of topics
    createNATSSubscriber(natsConfig, object1, customAttributesOfShape1)
    createNATSSubscriber(natsConfig, object2, customAttributesOfShape2)
  }
})

onUnmounted(() => {
  // Clean up resources when component is unmounted
  if (paper && graph) {
    CleanGraph(paper, graph)
  }

  // Clean up all subscriptions
  for (const id in subscriptions) {
    const shapeSubscriptions = subscriptions[id]
    shapeSubscriptions.forEach((subscription) => {
      if (typeof subscription === 'number') {
        // It's an interval ID
        clearInterval(subscription)
      } else if (subscription && typeof subscription.unsubscribe === 'function') {
        // It's a NATS subscription
        subscription.unsubscribe()
      }
    })
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
