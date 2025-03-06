<template>
  <div id="canvasZone">
    <canvas id="renderCanvas" ref="renderCanvas"></canvas>
    <!-- <div class="connection-status" :class="{ connected: isConnected }">
      {{ isConnected ? 'Connected' : 'Disconnected' }}
    </div> -->
    <div class="connection-status">
      <VIcon v-if="isConnected" icon="mdi-pipe" color="green"></VIcon>
      <VIcon v-else icon="mdi-pipe-disconnected" color="red"></VIcon>
    </div>
    <div class="resize-controls">
      <VIcon @click="toggleFullscreen">
        {{ isFullscreen ? 'mdi-arrow-collapse' : 'mdi-arrow-expand' }}
      </VIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, type Ref } from 'vue'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { AxesViewer } from 'babylonjs'
import { VIcon } from 'vuetify/components'

interface ComponentData {
  renderCanvas: Ref<HTMLCanvasElement | null>
  isConnected: Ref<boolean>
  isFullscreen: Ref<boolean>
  toggleFullscreen: () => void
}
export default defineComponent({
  name: 'BabylonScene',
  //   components: {
  //     VIcon
  //   },
  // export const BabylonScene = {
  //   name: 'BabylonScene',
  setup(): ComponentData {
    const renderCanvas = ref<HTMLCanvasElement | null>(null)
    const isConnected = ref<boolean>(false)
    const isFullscreen = ref<boolean>(false)
    const originalWidth = ref<string>('70vh') // Store the original width
    const originalHeight = ref<string>('70vh') // Store the original height

    let model: BABYLON.Mesh | null = null
    let gizmoManager: BABYLON.GizmoManager | null = null
    let axes: AxesViewer | null = null
    let xLabel: BABYLON.Mesh | null = null
    let yLabel: BABYLON.Mesh | null = null
    let zLabel: BABYLON.Mesh | null = null

    // const wsUrl = `ws://193.123.68.200:80/ws`;
    const wsUrl = `ws://localhost:9090/ws`
    console.log('Connecting to:', wsUrl)

    const socket = new WebSocket(wsUrl)
    const clientId = `Consumer-${Math.random().toString(36).substr(2, 8)}`

    const normalizeRotation = (mesh: BABYLON.Mesh) => {
      const normalize = (rotation: number) => (rotation + Math.PI * 2) % (Math.PI * 2)
      mesh.rotation.x = normalize(mesh.rotation.x)
      mesh.rotation.y = normalize(mesh.rotation.y)
      mesh.rotation.z = normalize(mesh.rotation.z)
    }

    let engine: BABYLON.Engine | undefined // Change to undefined

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
      const canvasZone = document.getElementById('canvasZone')
      if (canvasZone) {
        if (isFullscreen.value) {
          canvasZone.style.width = '100vh' //'100%'
          canvasZone.style.height = '100vh' //'100vh'
        } else {
          canvasZone.style.width = originalWidth.value
          canvasZone.style.height = originalHeight.value
        }
        if (renderCanvas.value && engine) {
          engine.resize()
        }
      }
    }

    onMounted(() => {
      if (renderCanvas.value) {
        const engine = new BABYLON.Engine(renderCanvas.value, true, {
          preserveDrawingBuffer: true,
          stencil: true
        })

        const createTextLabel = (scene: BABYLON.Scene, text: string, position: BABYLON.Vector3) => {
          const dynamicTexture = new BABYLON.DynamicTexture('label', 256, scene, true)
          const material = new BABYLON.StandardMaterial('labelMaterial', scene)
          material.diffuseTexture = dynamicTexture
          dynamicTexture.drawText(text, null, 150, 'bold 70px Arial', 'Black', '#7676a2')
          const labelMesh = BABYLON.MeshBuilder.CreatePlane('label', { size: 1 }, scene)
          labelMesh.material = material
          labelMesh.position = position
          return labelMesh
        }

        const createAxisLabels = (scene: BABYLON.Scene) => {
          xLabel = createTextLabel(scene, 'X', new BABYLON.Vector3(-2, 0, 0))
          yLabel = createTextLabel(scene, 'Y', new BABYLON.Vector3(0, 2, 0))
          zLabel = createTextLabel(scene, 'Z', new BABYLON.Vector3(0, 0, -2))
        }

        const createScene = (): BABYLON.Scene => {
          const scene = new BABYLON.Scene(engine)

          const camera = new BABYLON.ArcRotateCamera(
            'camera',
            BABYLON.Tools.ToRadians(90),
            BABYLON.Tools.ToRadians(65),
            10,
            BABYLON.Vector3.Zero(),
            scene
          )
          camera.attachControl(renderCanvas.value, true)

          const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)
          light.intensity = 0.8

          BABYLON.SceneLoader.ImportMesh('', '/assets/', 'skateboard.glb', scene, (newMeshes) => {
            model = newMeshes[0] as BABYLON.Mesh
            model.scaling = new BABYLON.Vector3(0.75, 0.75, 0.75)
            model.position = new BABYLON.Vector3(0, 1, 0)

            gizmoManager = new BABYLON.GizmoManager(scene)
            gizmoManager.attachToMesh(model)
            gizmoManager.rotationGizmoEnabled = true

            axes = new BABYLON.Debug.AxesViewer(scene, 2)
            axes.xAxis.parent = model
            axes.yAxis.parent = model
            axes.zAxis.parent = model

            createAxisLabels(scene)
          })

          return scene
        }

        const scene = createScene()
        engine.runRenderLoop(() => {
          scene.render()
        })

        const handleResize = (ev: UIEvent) => {
          engine.resize()
        }

        window.addEventListener('resize', handleResize)

        socket.onopen = () => {
          isConnected.value = true
          console.log(`WebSocket connected with client ID: ${clientId}`)
          socket.send(JSON.stringify({ clientID: clientId, type: 'consumer' }))
        }

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.accX !== undefined && model) {
              model.rotation = new BABYLON.Vector3(data.accX, data.accY, data.accZ)
              normalizeRotation(model)
            }
          } catch (error) {
            console.error('Message parsing error:', error)
          }
        }

        socket.onerror = (error) => {
          console.error('WebSocket error:', error)
        }

        socket.onclose = (event) => {
          isConnected.value = false
          console.log(`WebSocket closed: ${event.code} - ${event.reason}`)
        }

        const pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }))
          }
        }, 5000)

        onUnmounted(() => {
          clearInterval(pingInterval)
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(1000, 'Component unmounted')
          }
          window.removeEventListener('resize', handleResize)
        })
      }
    })

    return {
      renderCanvas,
      isConnected,
      isFullscreen,
      toggleFullscreen
    } as ComponentData
  }
})
</script>

<style scoped>
#canvasZone {
  width: 70vh; /* 100% of the parent container */ /* 80% of the viewport width */
  height: 70vh; /* 100vh of the parent container */
  position: relative; /* Make canvasZone a positioning context */
}

#renderCanvas {
  width: 100%; /* 50% of the parent container */
  height: 100%; /* 50% of the parent container */
  touch-action: none;
}

.connection-status {
  position: absolute;
  top: 10px;
  right: 10px; /* Position to the right */
  z-index: 10; /* Ensure it's above the canvas */
  padding: 5px 10px; /*padding: 5px 10px */
  border-radius: 4px;
  /* background: #ff4444; */
  color: white;
}

.resize-controls {
  position: absolute;
  top: 10px;
  right: 60px; /* Position to the right, adjust as needed */
  z-index: 10; /* Ensure it's above the canvas */
  cursor: pointer;
}

.connection-status.connected {
  background: #44ff44;
}
</style>
