<script setup>
const props = defineProps({
  title: String,
  titleSup: String,
  subtitle: String,
  bg: String,
});
</script>

<template>
  <div class="col-4 v-stack bg-light rounded">
    <!-- Head -->
    <div class="px-8 pt-4 pb-8 white" :class="bg ? 'bg-' + bg : false">
      <div class="fs-10 lh-16 fw-bold">
        {{ title }} <sup>{{ titleSup }}</sup>
      </div>
      <div class="fs-9 lh-12">{{ subtitle }}</div>
    </div>
    <!-- Table -->
    <div class="px-8 py-6">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
