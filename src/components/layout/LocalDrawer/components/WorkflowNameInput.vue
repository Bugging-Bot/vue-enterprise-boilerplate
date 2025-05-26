/** * Workflow name input component for editing and emitting workflow name changes * * @component *
@description Provides a text field for entering and updating a workflow name * @emits
update:workflowName - Updates the workflow name with the new value * @emits workflowNameChange -
Triggers when the workflow name is modified */

<template>
  <div class="pa-4">
    <v-text-field
      v-model="localWorkflowName"
      label="Name"
      placeholder="Enter workflow name"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-file-document-edit"
      @input="handleWorkflowNameChange"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
interface Props {
  workflowName: string
}

interface Emits {
  (e: 'update:workflowName', value: string): void
  (e: 'workflowNameChange'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localWorkflowName = computed({
  get: () => props.workflowName,
  set: (value: string) => emit('update:workflowName', value)
})
const handleWorkflowNameChange = () => {
  emit('workflowNameChange')
}
</script>

<style scoped>
.v-text-field {
  margin-bottom: 8px;
}
</style>
