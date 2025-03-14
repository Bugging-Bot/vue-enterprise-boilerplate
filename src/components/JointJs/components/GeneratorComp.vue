<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dia, shapes } from 'jointjs'

const props = defineProps<{
  position: { x: number; y: number }
}>()

const element = ref<dia.Element | null>(null)

const emit = defineEmits(['element-created'])

onMounted(() => {
  class Generator extends dia.Element {
    defaults() {
      return {
        ...super.defaults,
        type: 'Generator',
        size: { width: 220, height: 260 },
        power: 0,
        attrs: {
          body: {
            width: 'calc(w)',
            height: 'calc(h)',
            stroke: '#7f4439',
            strokeWidth: 2,
            fill: '#945042',
            rx: 5,
            ry: 5
          },
          label: {
            text: 'Generator',
            textAnchor: 'middle',
            x: 'calc(0.5*w)',
            y: 'calc(h+10)',
            fontSize: '14'
          }
        },
        markup: [
          { tagName: 'rect', selector: 'body' },
          { tagName: 'text', selector: 'label' }
        ]
      }
    }
  }

  element.value = new Generator({ position: props.position })
  emit('element-created', element.value)
})

defineExpose({
  element: element.value,
  setPower(power: number) {
    if (element.value) element.value.set('power', power)
  }
})
</script>
