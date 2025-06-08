<!--
  File: PropertyDialog.vue

  About:
  This component represents a dialog box that displays different tabs based on the type of item being edited (node, edge, or background).
  It allows users to configure various settings (such as node settings, edge settings, logic, and output).
  The dialog is persistent and can be opened and closed based on user interaction.

  It dynamically renders different settings components based on the item type (node, edge, or background).
-->

<template>
  <!-- Dialog component with dynamic content and tabs -->
  <v-dialog v-model="isDialogOpen" max-width="800px" persistent>
    <v-card>
      <!-- Dialog Title -->
      <v-card-title class="d-flex justify-space-between align-center"
        >{{ dialogTitle }}
        <!-- Close button -->
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Dialog Content -->
      <v-card-text>
        <!-- Tabs for selecting settings, logic, or output -->
        <v-tabs v-model="activeTab">
          <v-tab value="settings">Settings</v-tab>
          <v-tab value="logic">Logic</v-tab>
          <v-tab value="output">Output</v-tab>
        </v-tabs>

        <!-- Content for each tab -->
        <v-tabs-window v-model="activeTab">
          <!-- Settings Tab: Dynamically loads the appropriate settings component -->
          <v-tabs-window-item value="settings">
            <component :is="settingsComponent" :item="currentItem" />
          </v-tabs-window-item>

          <!-- Logic Tab: Displays the logic configuration component -->
          <v-tabs-window-item value="logic">
            <LogicTab :item="currentItem" :type="dialogType" />
          </v-tabs-window-item>

          <!-- Output Tab: Displays the output of the item -->
          <v-tabs-window-item value="output">
            <OutputTab :item="currentItem" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <!-- Commented out actions section, can be re-enabled for saving or canceling -->
      <!--
      <v-card-actions>
        <v-spacer />
        <v-btn @click="isDialogOpen = false">Cancel</v-btn>
        <v-btn color="primary" @click="saveChanges">Save</v-btn>
      </v-card-actions>
      -->
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
// Importing necessary modules and components
import { ref, computed } from 'vue'
import { usePropertyDialog } from './usePropertyDialog'
import NodeSettings from './NodeSettings.vue'
import EdgeSettings from './EdgeSettings.vue'
import BackgroundSettings from './BackgroundSettings.vue'
import LogicTab from './LogicTab.vue'
import OutputTab from './OutputTab.vue'

// Destructure the state and methods from the custom hook usePropertyDialog
const { isDialogOpen, dialogTitle, dialogType, currentItem, closeDialog, updateItem } =
  usePropertyDialog()

// Active tab within the dialog (default is 'settings')
const activeTab = ref('settings')

// Computed property to dynamically select the appropriate settings component based on the dialog type
const settingsComponent = computed(() => {
  switch (dialogType.value) {
    case 'node':
      return NodeSettings // Show NodeSettings component for node type
    case 'edge':
      return EdgeSettings // Show EdgeSettings component for edge type
    case 'background':
      return BackgroundSettings // Show BackgroundSettings component for background type
    default:
      return NodeSettings // Default to NodeSettings if no valid type
  }
})

// Optional: Save changes function (currently commented out)
// const saveChanges = () => {
//   // Save logic here
//   isDialogOpen.value = false
//   // Access the current item data and save changes
//   console.log('Saving changes for:', currentItem.value)
//   closeDialog()
// }
</script>
