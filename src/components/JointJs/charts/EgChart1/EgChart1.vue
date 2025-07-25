<!--
  EgChart1.vue - JointJS Chart Component

  A reusable chart component that renders a JointJS diagram with NATS subscription support.
  This component handles its own lifecycle, connection status, and cleanup.
-->

<template>
  <div class="chart-wrapper" ref="chartWrapper">
    <div ref="paperContainer" class="paper-container"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  defineExpose
  // Removed unused import: computed
} from 'vue'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '@/components/JointJs/composables/LayoutFactory'
import { createShapesandLinks } from './LocalShapes'
import { localCleanup, localSubscriber } from './LocalSubscriber'
import { createConnectionIndicator } from '../../../nats/LocalFunctions'
import { logger } from '@/utils/logger'

// Define types for the component
interface ChartInstance {
  paper: joint.dia.Paper | null
  graph: joint.dia.Graph | null
  refresh: () => Promise<void>
  cleanup: () => void
  exportSVG: () => string | null
  zoomIn: () => void
  zoomOut: () => void
  zoomToFit: () => void
}

// Create refs for the containers
const chartWrapper = ref<HTMLElement | null>(null)
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper | null = null
let graph: joint.dia.Graph | null = null
// Define connectionIndicator variable
let connectionIndicator: { update: (status: string) => void; remove: () => void } | null = null
const default_width = 800
const default_height = 600
const default_gridSize = 10

// Track component mounted state to prevent operations after unmount
let isMounted = false

/**
 * Initializes the chart by creating the paper, graph, shapes, and subscriptions
 */
const initializeChart = async (): Promise<void> => {
  if (!paperContainer.value || !isMounted) return

  try {
    logger.info('Initializing chart')

    // Get container dimensions
    const containerWidth =
      default_width > paperContainer.value.clientWidth
        ? default_width
        : paperContainer.value.clientWidth
    const containerHeight =
      default_height > paperContainer.value.clientHeight
        ? default_height
        : paperContainer.value.clientHeight

    // Initialize the paper and graph using CreateLayout
    const result = CreateLayout(
      paperContainer.value,
      containerWidth,
      containerHeight,
      default_gridSize
    )

    // Store the paper and graph references
    paper = result.paper
    graph = result.graph

    // Add event listeners for paper interactions
    if (paper) {
      // Prevent memory leaks by removing previous listeners
      paper.off('blank:pointerdown cell:pointerdown')

      // Add interaction handlers
      paper.on('blank:pointerdown', (evt, x, y) => {
        logger.debug('Paper blank area clicked', { x, y })
      })

      paper.on('cell:pointerdown', (cellView, evt, x, y) => {
        const cellId = cellView.model.id
        logger.debug('Cell clicked', { cellId, x, y })
      })
    }

    // Create shapes and links from configuration
    const { shapes } = createShapesandLinks(graph)

    // Initialize NATS subscriber with error handling
    try {
      await localSubscriber(shapes)
    } catch (error) {
      logger.error('Failed to initialize NATS subscriber', error)
      // Continue with the chart even if NATS fails
    }

    logger.info('Chart initialization complete')
  } catch (error) {
    logger.error('Error initializing chart', error)
    throw new Error('Failed to initialize chart')
  }
}

/**
 * Cleans up resources when the component is unmounted
 */
const cleanupChart = (): void => {
  logger.info('Cleaning up chart resources')

  // Clean up resources when component is unmounted
  if (paper && graph) {
    // Remove all event listeners to prevent memory leaks
    paper.off()

    CleanGraph(paper, graph)
    paper = null
    graph = null
  }

  // Clean up connection indicator
  if (connectionIndicator) {
    connectionIndicator.remove()
    connectionIndicator = null
  }

  // Clean up NATS subscriptions
  try {
    localCleanup()
  } catch (error) {
    logger.error('Error during NATS cleanup', error)
  }
}

/**
 * Refreshes the chart by cleaning up and reinitializing
 */
const refreshChart = async (): Promise<void> => {
  if (!isMounted) return

  logger.info('Refreshing chart')
  cleanupChart()
  await initializeChart()
}

/**
 * Exports the chart as SVG
 * @returns SVG string or null if export fails
 */
const exportSVG = (): string | null => {
  if (!paper || !isMounted) return null

  try {
    const svgDoc = paper.svg
    return new XMLSerializer().serializeToString(svgDoc)
  } catch (error) {
    logger.error('Error exporting chart as SVG', error)
    return null
  }
}

/**
 * Zooms in the paper view
 */
const zoomIn = (): void => {
  if (!paper || !isMounted) return

  const currentScale = paper.scale()
  paper.scale(currentScale.sx * 1.2, currentScale.sy * 1.2)
}

/**
 * Zooms out the paper view
 */
const zoomOut = (): void => {
  if (!paper || !isMounted) return

  const currentScale = paper.scale()
  paper.scale(currentScale.sx * 0.8, currentScale.sy * 0.8)
}

/**
 * Zooms to fit all content in the paper view
 */
const zoomToFit = (): void => {
  if (!paper || !graph || !isMounted) return

  const cells = graph.getCells()
  if (cells.length === 0) return

  paper.scaleContentToFit({ padding: 20 })
}

// Initialize the Paper and add shapes once the component is mounted
onMounted(async () => {
  isMounted = true

  if (chartWrapper.value) {
    // Create the connection status indicator
    connectionIndicator = createConnectionIndicator(chartWrapper.value)
  }

  try {
    await initializeChart()
  } catch (error) {
    logger.error('Failed to initialize chart on mount', error)
  }
})

// Clean up when component is unmounted
onUnmounted(() => {
  isMounted = false
  cleanupChart()
})

// Create a reactive object for the exposed API
const exposedApi: ChartInstance = {
  // Use getter functions to ensure we always return the current value
  get paper() {
    return paper
  },
  get graph() {
    return graph
  },
  refresh: refreshChart,
  cleanup: cleanupChart,
  exportSVG,
  zoomIn,
  zoomOut,
  zoomToFit
}

// Expose methods and properties to parent components
defineExpose(exposedApi)
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.paper-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

/* Ensure JointJS elements render properly */
:deep(.joint-paper) {
  background-color: #f8f9fa;
}

:deep(.joint-element) {
  cursor: pointer;
}

:deep(.joint-link) {
  cursor: pointer;
}

/* Optimize for print */
@media print {
  .chart-wrapper {
    height: auto;
    min-height: auto;
  }

  .paper-container {
    border: none;
    box-shadow: none;
  }
}
</style>
