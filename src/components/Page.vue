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
  aspect-ratio: 595 / 841 !important;
  width: 595px;
  height: 841px;
  background: white;
  overflow: hidden;
  padding: 12px;
}
</style>
