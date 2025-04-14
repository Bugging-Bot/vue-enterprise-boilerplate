<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import {
  subscribeToTopic,
  cleanupAllSubscriptions,
  checkPublisherExists
} from '@/components/nats/natsSubscriberService3'
//import factoryConfig from '@/components/JointJs/shapes/factory_config.json'
import { getSensorValueColor, getSensorTopic } from '../composables/chartConfiguration'

// Reactive data for UI display
const temperature = ref<string>('--')
const current = ref<string>('--')
const gas = ref<string>('--')
const flow = ref<string>('--')

// Track subscription status
const connectionStatus = ref<'connected' | 'connecting' | 'error'>('connecting')
const subscriptionStatuses = ref({
  temperature: false,
  current: false,
  gas: false,
  flow: false
})

// Store subscription cleanup functions
const unsubscribeFunctions: (() => void)[] = []

// Computed properties for sensor value colors
const temperatureColor = computed(() => getSensorValueColor('t', temperature.value))
const currentColor = computed(() => getSensorValueColor('a', current.value))
const gasColor = computed(() => getSensorValueColor('z', gas.value))
const flowColor = computed(() => getSensorValueColor('w', flow.value))

onMounted(async () => {
  try {
    connectionStatus.value = 'connecting'

    // Define topics
    const topics = {
      temperature: getSensorTopic(1, 1, 1, 'Temperature'),
      current: getSensorTopic(1, 1, 1, 'Current'),
      gas: getSensorTopic(1, 1, 1, 'Gas'),
      flow: getSensorTopic(1, 1, 1, 'Flow')
    }

    // Check if publishers exist (optional)
    const temperaturePublisherExists = await checkPublisherExists(topics.temperature)
    console.log(`Temperature publisher exists: ${temperaturePublisherExists}`)

    // Subscribe to temperature
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

    if (tempSubscription.subscription) {
      subscriptionStatuses.value.temperature = true
      unsubscribeFunctions.push(tempSubscription.unsubscribe)
    }

    // Subscribe to current
    const currentSubscription = await subscribeToTopic(topics.current, (msg: string) => {
      console.log('Current in Oven:', msg)
      current.value = msg
    })

    if (currentSubscription.subscription) {
      subscriptionStatuses.value.current = true
      unsubscribeFunctions.push(currentSubscription.unsubscribe)
    }

    // Subscribe to gas
    const gasSubscription = await subscribeToTopic(topics.gas, (msg: string) => {
      console.log('Gas in Oven:', msg)
      gas.value = msg
    })

    if (gasSubscription.subscription) {
      subscriptionStatuses.value.gas = true
      unsubscribeFunctions.push(gasSubscription.unsubscribe)
    }

    // Subscribe to flow
    const flowSubscription = await subscribeToTopic(topics.flow, (msg: string) => {
      console.log('Flow in Oven:', msg)
      flow.value = msg
    })

    if (flowSubscription.subscription) {
      subscriptionStatuses.value.flow = true
      unsubscribeFunctions.push(flowSubscription.unsubscribe)
    }

    // Update connection status based on subscriptions
    if (Object.values(subscriptionStatuses.value).some((status) => status)) {
      connectionStatus.value = 'connected'
    } else {
      connectionStatus.value = 'error'
    }
  } catch (error) {
    console.error('Error setting up NATS subscriptions:', error)
    connectionStatus.value = 'error'
  }
})

onUnmounted(() => {
  // Clean up individual subscriptions
  unsubscribeFunctions.forEach((unsubscribe) => unsubscribe())

  // Or alternatively, clean up all subscriptions at once
  cleanupAllSubscriptions()
})
</script>

<template>
  <div class="nats-example">
    <h1>📊 Example Chart with NATS</h1>

    <div class="connection-status">
      <div class="status-indicator" :class="connectionStatus"></div>
      Connection Status: {{ connectionStatus }}
    </div>

    <div class="metrics-container">
      <div class="metric-card" :class="{ active: subscriptionStatuses.temperature }">
        <h3>Temperature</h3>
        <div class="metric-value" :style="{ color: temperatureColor }">
          {{ temperature === '--' ? temperature : `${temperature}°C` }}
        </div>
      </div>

      <div class="metric-card" :class="{ active: subscriptionStatuses.current }">
        <h3>Current</h3>
        <div class="metric-value" :style="{ color: currentColor }">
          {{ current === '--' ? current : `${current}A` }}
        </div>
      </div>

      <div class="metric-card" :class="{ active: subscriptionStatuses.gas }">
        <h3>Gas</h3>
        <div class="metric-value" :style="{ color: gasColor }">
          {{ gas === '--' ? gas : `${gas}ppm` }}
        </div>
      </div>

      <div class="metric-card" :class="{ active: subscriptionStatuses.flow }">
        <h3>Flow</h3>
        <div class="metric-value" :style="{ color: flowColor }">
          {{ flow === '--' ? flow : `${flow}L/min` }}
        </div>
      </div>
    </div>
  </div>
  <div class="legend">
    <h3>Status Legend</h3>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #008000"></div>
      <div>Operational</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #ffd700"></div>
      <div>Warning</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #ff0000"></div>
      <div>Error/Danger</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #808080"></div>
      <div>Inactive</div>
    </div>
  </div>
</template>

<style scoped>
.nats-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.connection-status {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}

.status-indicator.connected {
  background-color: #4caf50;
}

.status-indicator.connecting {
  background-color: #ff9800;
}

.status-indicator.error {
  background-color: #f44336;
}

.metrics-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.metric-card {
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.metric-card.active {
  border-color: #4caf50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.metric-card h3 {
  margin-top: 0;
  color: #333;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #2196f3;
}
</style>
