<script setup>
function today() {
  var date = new Date();
  return date.toLocaleDateString();
}
</script>

<template>
  <div class="row column-gap-12 mb-8">
    <div class="col-4">
      <div class="fs-13 lh-16">
        <span class="fw-bold">Sales Proposal</span> for Christopher Goldenbrown from Vary Long Company Name
      </div>
    </div>
    <div class="col-6">
      <div class="row">
        <div class="col-6">
          <div class="manager">
            <div class="photo">
              <img src="../assets/kirill.png" width="32" height="32" alt="" />
            </div>
            <div class="v-stack fs-6 lh-8">
              <span>CEO</span>
              <span>Kirill Klochkov</span>
              <span>kirill@cmykengineering.com</span>
              <span>+1 213 315 34 89</span>
              <span class="grey">Phone, WhatsApp, Telegram</span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="manager">
            <div class="photo">
              <img src="../assets/david.png" width="32" height="32" alt="" />
            </div>
            <div class="v-stack fs-6 lh-8">
              <span>VPO</span>
              <span>David Medina</span>
              <span>david@cmykengineering.com</span>
              <span>+1 213 315 34 89</span>
              <span class="grey">Phone, WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="v-stack fs-6 lh-8 flex-end grey">
        <span>Created on {{ today() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manager {
  display: flex;
  gap: 8px;
  .photo {
    display: flex;
    width: 32px;
    height: 32px;
    background: #898989;
    border-radius: 99px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
}
</style>
