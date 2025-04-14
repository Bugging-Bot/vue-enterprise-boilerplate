<!-- This is charting for Make Sourdough Loaf -->
<template>
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  computed //, reactive
} from 'vue'
import {
  subscribeToTopic,
  cleanupAllSubscriptions,
  checkPublisherExists
} from '@/components/nats/natsSubscriberService3'
import { CreateShape } from '@/components/JointJs/composables/ShapeFactory'
import { CreateLink } from '../composables/LinkFactory'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '../composables/LayoutFactory'
//import { subscribeToTopics } from '@/components/nats/natsSubscriberService'
import {
  getSensorValueColor,
  getSensorTopic
} from '@/components/JointJs/composables/chartConfiguration'

// Create a ref for the container
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper
let graph: joint.dia.Graph
let object_temp: joint.dia.Element
let object_current: joint.dia.Element
// //let natsConnection: NatsConnection | null = null
// let subscriptions: { [id: string]: any[] } = {}

// Reactive data for UI display
const temperature = ref<string>('--')
const current = ref<string>('--')

// Track subscription status
const connectionStatus = ref<'connected' | 'connecting' | 'error'>('connecting')
const subscriptionStatuses = ref({
  temperature: false,
  current: false
})

// Store subscription cleanup functions
const unsubscribeFunctions: (() => void)[] = []

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

// Initialize the Paper and add shapes once the component is mounted
onMounted(async () => {
  try {
    const topics = {
      temperature: getSensorTopic(1, 1, 1, 'Temperature'),
      current: getSensorTopic(1, 1, 1, 'Current')
    }
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
      object_temp = CreateShape(
        { x: 250, y: 87 },
        { width: 120, height: 350 },
        'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
        'Temperature',
        { x: 35, y: 45 },
        '#808080', // Default gray color for inactive
        customAttributesOfShape1,
        graph
      )

      // Check if publishers exist (optional)
      const temperaturePublisherExists = await checkPublisherExists(topics.temperature)
      console.log(`Temperature publisher exists: ${temperaturePublisherExists}`)

      // subscribe to the temperature topic
      const tempSubscription = await subscribeToTopic(
        topics.temperature,
        (msg: string) => {
          console.log('Temperature in Oven:', msg)
          temperature.value = msg
        },
        {
          timeout: 5000,
          retryInterval: 2000,
          maxRetries: 3
        }
      )
      // Check if the subscription is successful
      if (tempSubscription.subscription) {
        subscriptionStatuses.value.temperature = true
        unsubscribeFunctions.push(tempSubscription.unsubscribe)
      }

      // Add shapes to the graph
      object_current = CreateShape(
        { x: 450, y: 87 },
        { width: 120, height: 350 },
        'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
        'Current',
        { x: 35, y: 45 },
        '#808080',
        customAttributesOfShape2,
        graph
      )

      // Subscribe to current
      const currentSubscription = await subscribeToTopic(topics.current, (msg: string) => {
        console.log('Current in Oven:', msg)
        current.value = msg
      })

      // Check if the subscription is successful
      if (currentSubscription.subscription) {
        subscriptionStatuses.value.current = true
        unsubscribeFunctions.push(currentSubscription.unsubscribe)
      }

      CreateLink(object_temp, object_current, 'Link', customAttributesOfLink, graph)
    }
    connectionStatus.value = 'connecting'

    // Check if publishers exist (optional)
    const temperaturePublisherExists = await checkPublisherExists(topics.temperature)
    const currentPublisherExists = await checkPublisherExists(topics.current)
    console.log(`Temperature publisher exists: ${temperaturePublisherExists}`)
    console.log(`Current publisher exists: ${currentPublisherExists}`)

    // Subscribe to temperature
    const tempSubscription = await subscribeToTopic(
      topics.temperature,
      (msg: string) => {
        temperature.value = msg
      },
      {
        timeout: 5000,
        retryInterval: 2000,
        maxRetries: 3
      }
    )
    if (tempSubscription.subscription) {
      subscriptionStatuses.value.temperature = true
      unsubscribeFunctions.push(tempSubscription.unsubscribe)
    }

    // Subscribe to current
    const currentSubscription = await subscribeToTopic(
      topics.current,
      (msg: string) => {
        current.value = msg
      },
      {
        timeout: 5000,
        retryInterval: 2000,
        maxRetries: 3
      }
    )

    if (currentSubscription.subscription) {
      subscriptionStatuses.value.current = true
      unsubscribeFunctions.push(currentSubscription.unsubscribe)
    }

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

      CreateLink(object_temp, object_current, 'Link', customAttributesOfLink, graph)
    }
  } catch (error) {
    console.error('Error setting up NATS subscriptions:', error)
    connectionStatus.value = 'error'
  }
})

onUnmounted(() => {
  // Clean up resources when component is unmounted
  if (paper && graph) {
    CleanGraph(paper, graph)
  }

  // Clean up individual subscriptions
  unsubscribeFunctions.forEach((unsubscribe) => unsubscribe())

  // Or alternatively, clean up all subscriptions at once
  cleanupAllSubscriptions()
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
