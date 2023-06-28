<script setup>
const props = defineProps({
  title: String,
  text: String,
});
</script>

<template>
  <div>
    <div class="fs-8 lh-16 fw-bold">{{ title }}</div>
    <div class="fs-8 lh-12">{{ text }}</div>
  </div>
</template>

<style scoped></style>
