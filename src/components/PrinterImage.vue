<script setup>
const props = defineProps({
  id: Number,
});
</script>

<template>
  <div class="image-wrapper bg-light mb-8">
    <img
      loading="lazy"
      crossorigin="anonymous"
      class="printer-image"
      :src="'../src/assets/' + props.id + '.png'"
      alt=""
    />
  </div>
</template>

<style scoped>
.image-wrapper {
  display: block;
  width: 100%;
  height: 127px;
  overflow: hidden;
  border-radius: 6px;
}
.printer-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
