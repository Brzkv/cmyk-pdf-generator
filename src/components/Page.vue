<script setup></script>

<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  position: relative;
  aspect-ratio: 540 / 785 !important;
  height: 100%;
  width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid var(--border);
}
</style>
