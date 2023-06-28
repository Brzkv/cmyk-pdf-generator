<script setup>
const props = defineProps({
  data: Array,
});
</script>

<template>
  <div>
    <div class="fs-8 lh-16 fw-bold">Tech Specs</div>
    <div class="row" v-for="spec in props.data">
      <div class="col-4 fs-8 lh-12 grey">{{ spec.title }}</div>
      <div class="col-8 fs-8 lh-12 text-right">{{ spec.value }}</div>
    </div>
  </div>
</template>

<style scoped></style>
