<template>
  <div class="dummy-container">
    <h1>This is a Dummy Component</h1>
    <p>If you see this message, it means the component is rendering correctly.</p>
  </div>
</template>

<script setup lang="ts">
// No special logic needed for this dummy component
console.log('Dummy View loaded')
</script>

<style scoped>
.dummy-container {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  margin-top: 20px;
}
</style>
