/** * DrawerHeader component for local navigation and workflow configuration * * @component *
@description Renders a drawer header with optional workflow name input, title, and description *
@prop {string} [title] - Optional title displayed in the header * @prop {string} [description] -
Optional description text for the header * @prop {boolean} [showWorkflowNameInput] - Flag to show
workflow name input section * @prop {string} workflowName - Current workflow name * @emits
update:workflowName - Event to update workflow name * @emits workflowNameChange - Event triggered
when workflow name changes */
<template>
  <div>
    <v-list-item title="local navigation bar"></v-list-item>
    <v-divider></v-divider>

    <!-- Workflow Name Input Section -->
    <WorkflowNameInput
      v-if="showWorkflowNameInput"
      v-model:workflow-name="workflowName"
      @workflow-name-change="$emit('workflowNameChange')"
    />

    <!-- Divider and Label for workflow nodes -->
    <div v-if="showWorkflowNameInput">
      <v-divider></v-divider>
      <v-list-subheader class="text-subtitle-2 font-weight-medium">
        {{ title }}
      </v-list-subheader>
    </div>

    <!-- Configuration Title and Description -->
    <div v-if="!showWorkflowNameInput && title" class="pa-4">
      <h3 class="text-h6 mb-2">{{ title }}</h3>
      <p v-if="description" class="text-caption text-medium-emphasis">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkflowNameInput from './WorkflowNameInput.vue'

interface Props {
  title?: string
  description?: string
  showWorkflowNameInput?: boolean
  workflowName: string
}

interface Emits {
  (e: 'update:workflowName', value: string): void
  (e: 'workflowNameChange'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.v-list-subheader {
  color: rgba(var(--v-theme-on-surface), 0.7);
  padding: 8px 16px;
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
}

.text-h6 {
  color: rgba(var(--v-theme-on-surface), 0.87);
}

.text-medium-emphasis {
  color: rgba(var(--v-theme-on-surface), 0.6);
}
</style>
