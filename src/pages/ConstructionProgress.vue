<template>
  <Layout>
    <template #default>
      <v-card class="pa-4">
        <h1>Progress</h1>
        <div>Check connstruction progress of project</div>
      </v-card>
      <!-- adding image comparision code, start -->
      <v-row justify="center">
        <v-col cols="12" md="10">
          <div class="comparison-container elevation-6 rounded-lg">
            <VueCompareImage
              :leftImage="beforeImagePath"
              :rightImage="afterImagePath"
              class="styled-slider"
              :sliderLineWidth="3"
              sliderLineColor="#FFFFFF"
              :handleSize="40"
            >
              <template #left-label>
                <figcaption class="left-label">Before</figcaption>
              </template>

              <template #right-label>
                <figcaption class="right-label">After</figcaption>
              </template>
            </VueCompareImage>
          </div>
        </v-col>
      </v-row>
      <!-- adding image comparision code, end -->
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/LayoutView.vue'
// adding image comparision code, start
import { VueCompareImage } from 'vue3-compare-image'
import { ref } from 'vue'
const beforeImagePath = ref(
  '../../public/assets/construction/builder_1/project_1/Construction1.png'
)
const afterImagePath = ref('../../public/assets/construction/builder_1/project_1/Construction2.png')
// adding image comparision code, end
</script>

<style scoped>
.pa-4 {
  padding: 1rem;
}

/* Container styling */
.comparison-container {
  overflow: hidden;
  max-width: 421px; /*100%;*/
  margin: 0 auto; /* Center the container */
}

/* Customizing the labels to match your original design */
.left-label,
.right-label {
  /* Styles matching your original figcaption */
  background: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 12px;
  color: #2e3452;
  opacity: 0.8;
  padding: 12px;
  position: absolute; /* The component handles positioning the slot container */
  top: 50%;
  transform: translateY(-50%);
  line-height: 100%;
  z-index: 1;
}

/* Override the component's default label positioning if needed */
.left-label {
  left: 12px;
}

.right-label {
  right: 12px;
}

/* Set fixed height for the component */
.styled-slider {
  /* height: 60px; */
}
</style>
