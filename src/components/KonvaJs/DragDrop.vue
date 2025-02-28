<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-text
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          text: 'Draggable Text',
          x: 50,
          y: 50,
          draggable: true,
          fill: isDragging ? 'green' : 'black'
        }"
      />
      <v-rect
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: 100,
          y: 100,
          width: 50,
          height: 50,
          fill: 'red',
          draggable: true
        }"
      />
    </v-layer>
  </v-stage>

  <div
    ref="contextMenu"
    style="
      display: none;
      position: absolute;
      z-index: 1000;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    "
  ></div>
  <div @click="bringToFront" style="padding: 8px 16px; cursor: pointer">Bring to Front</div>
  <div @click="sendToBack" style="padding: 8px 16px; cursor: pointer">Send to Back</div>
</template>

<script>
export default {
  data() {
    return {
      stageSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      isDragging: false
    }
  },
  mounted() {
    const container = this.$refs.stage.getStage().container()

    container.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      if (this.currentShape) {
        this.$refs.contextMenu.style.display = 'block'
        this.$refs.contextMenu.style.top = e.pageY + 'px'
        this.$refs.contextMenu.style.left = e.pageX + 'px'
      }
    })

    window.addEventListener('click', () => {
      this.$refs.contextMenu.style.display = 'none'
    })
  },
  methods: {
    handleDragStart() {
      this.isDragging = true
    },
    handleDragEnd() {
      this.isDragging = false
    },
    bringToFront() {
      if (this.currentShape) {
        this.currentShape.moveToTop()
      }
    },
    sendToBack() {
      if (this.currentShape) {
        this.currentShape.moveToBottom()
      }
    }
  }
}
</script>
<style scoped>
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}
</style>
