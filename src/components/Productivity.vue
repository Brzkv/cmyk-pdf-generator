<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div>
    <div class="fs-8 lh-16 fw-bold">Productivity</div>
    <div class="row grey fs-8 lh-12">
      <div class="col-6">Mode</div>
      <div class="col-3 text-right">Boards</div>
      <div class="col-3 text-right">Ft²</div>
    </div>
    <div class="row fs-8 lh-12" v-for="row in props.data">
      <div class="col-6">{{ row.mode }}</div>
      <div class="col-3 text-right">{{ row.boards }}</div>
      <div class="col-3 text-right">{{ row.square_feets }}</div>
    </div>
  </div>
</template>

<style scoped></style>
