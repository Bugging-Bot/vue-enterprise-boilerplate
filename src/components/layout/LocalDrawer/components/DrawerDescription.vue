/** * Drawer description component that displays an informative alert * when the description should
be shown. * * @component * @prop {boolean} showDescription - Controls the visibility of the
description alert */
<template>
  <div v-if="showDescription" class="pa-4">
    <v-alert type="info" variant="tonal" class="text-caption">
      You can drag workflow nodes to the canvas to build your workflow.
    </v-alert>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showDescription: boolean
}

defineProps<Props>()
</script>
