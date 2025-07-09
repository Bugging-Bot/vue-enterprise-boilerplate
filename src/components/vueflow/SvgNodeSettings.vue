<!--
  File: SvgNodeSettings.vue
07-07-2025
  About:
  This component provides SVG-specific configuration fields for CustomSvgNode.
  It's designed to be used within the PropertyDialog for node settings.

  How it work:
  The component emits update events whenever any field changes, allowing the parent PropertyDialog.vue to update the actual node in real-time.

  Features:
      Node Label Input - Text input for node labels
      SVG Path Input - Textarea for SVG path data with monospace font
      Dimensions Control - Number inputs for width and height
      ViewBox Configuration - Text input for SVG viewBox
      Color Controls - Color picker + text input for fill and stroke colors
      Stroke Width Slider - Range input with live value display
      Live Preview - Real-time SVG preview as you make changes
      Sample Paths - Quick buttons to apply common SVG shapes
      Responsive Design - Works on mobile and desktop
      Dark Mode Support - Automatic dark theme detection
      Accessibility - Proper focus styles and keyboard navigation
-->

<template>
  <div class="svg-node-settings">
    <!-- Node Label -->
    <div class="form-group">
      <label class="form-label">Node Label:</label>
      <input
        v-model="localData.label"
        type="text"
        class="form-input"
        placeholder="Enter node label"
        @input="emitUpdate"
      />
    </div>

    <!-- SVG Path Input -->
    <div class="form-group">
      <label class="form-label">SVG Path:</label>
      <textarea
        v-model="localData.svgPath"
        class="form-textarea"
        placeholder="Enter SVG path data (e.g., M12 2L14 8H20L15 12...)"
        rows="4"
        @input="emitUpdate"
      ></textarea>
      <small class="help-text"> Enter the 'd' attribute value of an SVG path element </small>
    </div>

    <!-- SVG Dimensions -->
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Width:</label>
        <input
          v-model.number="localData.svgWidth"
          type="number"
          class="form-input"
          min="20"
          max="200"
          @input="emitUpdate"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Height:</label>
        <input
          v-model.number="localData.svgHeight"
          type="number"
          class="form-input"
          min="20"
          max="200"
          @input="emitUpdate"
        />
      </div>
    </div>

    <!-- ViewBox -->
    <div class="form-group">
      <label class="form-label">ViewBox:</label>
      <input
        v-model="localData.viewBox"
        type="text"
        class="form-input"
        placeholder="0 0 24 24"
        @input="emitUpdate"
      />
      <small class="help-text"> Format: "minX minY width height" (e.g., "0 0 24 24") </small>
    </div>

    <!-- Color Settings -->
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Fill Color:</label>
        <div class="color-input-group">
          <input v-model="fillColor" type="color" class="form-color-input" @input="emitUpdate" />
          <input
            v-model="fillColor"
            type="text"
            class="form-input color-text"
            placeholder="#3b82f6"
            @input="emitUpdate"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Stroke Color:</label>
        <div class="color-input-group">
          <input v-model="strokeColor" type="color" class="form-color-input" @input="emitUpdate" />
          <input
            v-model="strokeColor"
            type="text"
            class="form-input color-text"
            placeholder="#1e40af"
            @input="emitUpdate"
          />
        </div>
      </div>
    </div>

    <!-- Stroke Width -->
    <div class="form-group">
      <label class="form-label">Stroke Width:</label>
      <div class="range-input-group">
        <input
          v-model.number="strokeWidth"
          type="range"
          class="form-range"
          min="0"
          max="5"
          step="0.25"
          @input="emitUpdate"
        />
        <span class="range-value">{{ localData.settings?.strokeWidth }}</span>
      </div>
    </div>

    <!-- Preview Section -->
    <div class="preview-section">
      <label class="form-label">Preview:</label>
      <div class="preview-container">
        <svg
          :width="localData.svgWidth || 60"
          :height="localData.svgHeight || 60"
          :viewBox="localData.viewBox || '0 0 24 24'"
          class="preview-svg"
        >
          <path
            :d="localData.svgPath || defaultPath"
            :fill="localData.settings?.color || '#3b82f6'"
            :stroke="localData.settings?.strokeColor || '#1e40af'"
            :stroke-width="localData.settings?.strokeWidth || 0.5"
          />
        </svg>
        <div class="preview-label">{{ localData.label || 'Custom Node' }}</div>
      </div>
    </div>

    <!-- Sample SVG Paths -->
    <div class="samples-section">
      <label class="form-label">Quick Samples:</label>
      <div class="sample-buttons">
        <button
          v-for="sample in samplePaths"
          :key="sample.name"
          @click="applySample(sample)"
          class="sample-btn"
          type="button"
        >
          {{ sample.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { CustomNodeData } from './types'

interface Props {
  item: any // The node item from PropertyDialog
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [data: CustomNodeData]
}>()

// Local data that syncs with the prop
const localData = ref<CustomNodeData>({
  label: 'Custom Node',
  svgPath: 'M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z',
  svgWidth: 60,
  svgHeight: 60,
  viewBox: '0 0 24 24',
  settings: {
    color: '#3b82f6',
    strokeColor: '#1e40af',
    strokeWidth: 0.5
  },
  localItem: null // Add this required property
})

const defaultPath = 'M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z'

const samplePaths = [
  {
    name: 'Star',
    path: 'M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Heart',
    path: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Gear',
    path: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Diamond',
    path: 'M12,2L2,7L12,22L22,7L12,2M12,4.33L18.67,7L12,17.67L5.33,7L12,4.33Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'House',
    path: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z',
    viewBox: '0 0 24 24'
  }
]

// Add these computed properties after the localData ref
const fillColor = computed({
  get: () => localData.value.settings?.color || '#3b82f6',
  set: (value: string) => {
    if (!localData.value.settings) localData.value.settings = {}
    localData.value.settings.color = value
    emitUpdate()
  }
})

const strokeColor = computed({
  get: () => localData.value.settings?.strokeColor || '#1e40af',
  set: (value: string) => {
    if (!localData.value.settings) localData.value.settings = {}
    localData.value.settings.strokeColor = value
    emitUpdate()
  }
})

const strokeWidth = computed({
  get: () => localData.value.settings?.strokeWidth || 0.5,
  set: (value: number) => {
    if (!localData.value.settings) localData.value.settings = {}
    localData.value.settings.strokeWidth = value
    emitUpdate()
  }
})

// Initialize local data from props
onMounted(() => {
  if (props.item?.data) {
    localData.value = {
      label: props.item.data.label || 'Custom Node',
      svgPath: props.item.data.svgPath || defaultPath,
      svgWidth: props.item.data.svgWidth || 60,
      svgHeight: props.item.data.svgHeight || 60,
      viewBox: props.item.data.viewBox || '0 0 24 24',
      settings: {
        color: props.item.data.settings?.color || '#3b82f6',
        strokeColor: props.item.data.settings?.strokeColor || '#1e40af',
        strokeWidth: props.item.data.settings?.strokeWidth || 0.5,
        ...props.item.data.settings
      },
      localItem: null, // Add this
      ...props.item.data
    }
  }
})

// Watch for prop changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem?.data) {
      localData.value = {
        label: newItem.data.label || 'Custom Node',
        svgPath: newItem.data.svgPath || defaultPath,
        svgWidth: newItem.data.svgWidth || 60,
        svgHeight: newItem.data.svgHeight || 60,
        viewBox: newItem.data.viewBox || '0 0 24 24',
        settings: {
          color: newItem.data.settings?.color || '#3b82f6',
          strokeColor: newItem.data.settings?.strokeColor || '#1e40af',
          strokeWidth: newItem.data.settings?.strokeWidth || 0.5,
          ...newItem.data.settings
        },
        localItem: null, // Add this
        ...newItem.data
      }
    }
  },
  { deep: true }
)

const emitUpdate = () => {
  emit('update', localData.value)
}

const applySample = (sample: any) => {
  localData.value.svgPath = sample.path
  localData.value.viewBox = sample.viewBox
  localData.value.label = sample.name
  emitUpdate()
}
</script>

<style scoped>
.svg-node-settings {
  padding: 16px 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.4;
}

.color-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.form-color-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.color-text {
  flex: 1;
}

.range-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-range {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.form-range::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.form-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-value {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  min-width: 30px;
  text-align: center;
}

.help-text {
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
  display: block;
}

.preview-section {
  margin: 20px 0;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.preview-svg {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
}

.preview-label {
  font-size: 11px;
  font-weight: 500;
  color: #374151;
  text-align: center;
}

.samples-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.sample-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.sample-btn {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sample-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.sample-btn:active {
  background: #d1d5db;
  transform: translateY(1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .color-input-group {
    flex-direction: column;
    align-items: stretch;
  }

  .form-color-input {
    width: 100%;
    height: 40px;
  }

  .sample-buttons {
    justify-content: center;
  }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .svg-node-settings {
    color: #f3f4f6;
  }

  .form-label {
    color: #e5e7eb;
  }

  .form-input,
  .form-textarea {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }

  .form-input:focus,
  .form-textarea:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  .preview-section {
    background: #374151;
    border-color: #4b5563;
  }

  .preview-container {
    background: #4b5563;
    border-color: #6b7280;
  }

  .preview-svg {
    background: #f3f4f6;
  }

  .sample-btn {
    background: #4b5563;
    border-color: #6b7280;
    color: #e5e7eb;
  }

  .sample-btn:hover {
    background: #6b7280;
    border-color: #9ca3af;
  }

  .help-text {
    color: #9ca3af;
  }

  .range-value,
  .preview-label {
    color: #e5e7eb;
  }
}

/* Animation for smooth transitions */
.svg-node-settings * {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

/* Focus styles for accessibility */
.form-input:focus,
.form-textarea:focus,
.form-color-input:focus,
.form-range:focus,
.sample-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading state (optional) */
.svg-node-settings.loading {
  opacity: 0.6;
  pointer-events: none;
}

.svg-node-settings.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
