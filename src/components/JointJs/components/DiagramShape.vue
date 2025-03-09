<!--
This component will represent a single shape in the diagram.
It will handle resizing, port creation, and rendering of the shape's content (including SVGs).
-->
<template>
  <div :style="shapeStyle">
    <slot></slot>
    <div class="resize-dot" @mousedown="startResize"></div>
  </div>
</template>

<script>
export const DiagramShape = {
  props: {
    shape: Object // JointJS shape object
  },
  data() {
    return {
      isResizing: false,
      startX: 0,
      startY: 0
    }
  },
  computed: {
    shapeStyle() {
      return {
        position: 'absolute',
        left: this.shape.attributes.position.x + 'px',
        top: this.shape.attributes.position.y + 'px',
        width: this.shape.attributes.size.width + 'px',
        height: this.shape.attributes.size.height + 'px'
      }
    }
  },
  methods: {
    startResize(event) {
      this.isResizing = true
      this.startX = event.clientX
      this.startY = event.clientY
      document.addEventListener('mousemove', this.resize)
      document.addEventListener('mouseup', this.stopResize)
    },
    resize(event) {
      if (this.isResizing) {
        const deltaX = event.clientX - this.startX
        const deltaY = event.clientY - this.startY
        this.shape.resize(
          this.shape.attributes.size.width + deltaX,
          this.shape.attributes.size.height + deltaY
        )
        this.startX = event.clientX
        this.startY = event.clientY
      }
    },
    stopResize() {
      this.isResizing = false
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.stopResize)
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
}
.resize-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #333;
  cursor: nwse-resize;
}
</style>
