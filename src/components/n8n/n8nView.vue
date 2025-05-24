<template>
  <div>
    <h1>Embedded n8n</h1>
    <iframe
      ref="n8nFrame"
      :src="n8nUrl"
      width="100%"
      :height="iframeHeight"
      frameborder="0"
      @load="adjustIframeHeight"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n8nUrl: 'http://localhost:5678/',
      iframeHeight: '900px', // Initial height
      intervalId: null
    }
  },
  mounted() {
    console.log('EmbedN8n component mounted. Starting height check interval.')
    this.intervalId = setInterval(this.adjustIframeHeight, 500) // Adjust interval as needed
  },
  beforeUnmount() {
    console.log('EmbedN8n component unmounted. Clearing height check interval.')
    clearInterval(this.intervalId)
  },
  methods: {
    adjustIframeHeight() {
      try {
        if (
          this.$refs.n8nFrame &&
          this.$refs.n8nFrame.contentWindow &&
          this.$refs.n8nFrame.contentWindow.document.body
        ) {
          const newHeight = this.$refs.n8nFrame.contentWindow.document.body.scrollHeight + 'px'
          if (newHeight !== this.iframeHeight) {
            this.iframeHeight = newHeight
          }
        }
      } catch (error) {
        console.warn(
          'Could not access iframe content for height adjustment due to cross-origin restrictions:',
          error
        )
        // Optionally, you could stop the interval if it consistently fails due to CORS.
        // clearInterval(this.intervalId);
      }
    }
  }
}
</script>

<style scoped>
iframe {
  border: 1px solid #ccc;
  display: block; /* Prevent extra space below the iframe */
}
</style>
