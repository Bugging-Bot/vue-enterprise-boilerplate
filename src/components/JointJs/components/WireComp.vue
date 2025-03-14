<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dia } from 'jointjs'

const props = defineProps<{
  source: { id: string }
  target: { id: string }
}>()

const element = ref<dia.Link | null>(null)

onMounted(() => {
  class Wire extends dia.Link {
    defaults() {
      return {
        ...super.defaults,
        type: 'Wire',
        attrs: {
          line: { connection: true, stroke: '#346f83', strokeWidth: 2 },
          outline: { connection: true, stroke: '#004456', strokeWidth: 4 }
        },
        markup: [
          { tagName: 'path', selector: 'outline' },
          { tagName: 'path', selector: 'line' }
        ]
      }
    }
  }

  element.value = new Wire({ source: props.source, target: props.target })
  emit('element-created', element.value)
})

defineExpose({
  element: element.value
})

const emit = defineEmits(['element-created'])
</script>
