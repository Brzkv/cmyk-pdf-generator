<template>
  <div class="pages" v-if="printerStore.selected_printer">
    <Page>
      <!-- Head -->
      <Head />

      <!-- Overview -->
      <div class="v-stack row-gap-12 border-black border-top border-bottom py-8 mb-8">
        <div class="row">
          <div class="col-9 v-stack">
            <span class="fs-20 lh-24 fw-bold">The SOVA {{ printerStore.selected_printer.title.rendered }}</span>
            <span class="fs-20 lh-24 fw-normal">{{ printerStore.selected_config.configuration }}</span>
          </div>
          <div class="col-3 v-stack justify-end flex-end">
            <span class="magenta relative fs-10 lh-16 fw-bold">
              $108,000
              <span class="strike"></span>
            </span>
            <span class="fs-14 lh-16 fw-bold">$99,000</span>
          </div>
        </div>
        <div class="row column-gap-12">
          <div class="col-3 v-stack">
            <TextBlock title="Overview" :text="printerStore.selected_printer.acf.full_description" />
            <div class="v-stack justify-end flex-grow row-gap-8">
              <div class="grey fs-8 lh-12">Powered by LIPLA Inks<br />& Kyocera Printheads</div>
              <img src="../assets/lipla-kyocera.png" width="98" />
            </div>
          </div>
          <div class="col-5">
            <PrinterImage :id="printerStore.selected_printer.id" />
            <Specs :data="printerStore.selected_printer.acf.product_specs" />
          </div>
          <div class="col-4">
            <TextBlock title="Configuration" :text="printerStore.selected_config.description" />
            <Plate :data="printerStore.selected_config.color_scheme" />
            <Productivity :data="printerStore.selected_config.speeds" />
          </div>
        </div>
      </div>

      <!-- Purchase Options -->
      <PurchaseOptions :data="printerStore.selected_config" />

      <!-- Footer -->
      <Footer />
    </Page>

    <Page>
      <!-- Printer Features Overview -->
      <div class="features">Features</div>
      <!-- About Company -->
      <div class="about fs-8"></div>
    </Page>
  </div>
</template>

<script setup>
import Page from '../components/Page.vue';
import TextBlock from './TextBlock.vue';
import PrinterImage from './PrinterImage.vue';
import Plate from './Plate.vue';
import Specs from './Specs.vue';
import PurchaseOptions from './PurchaseOptions.vue';
import Productivity from './Productivity.vue';
import Head from './Head.vue';
import Footer from './Footer.vue';
import { usePrinterStore } from '../stores/printerStore';

const printerStore = usePrinterStore();
printerStore.loadPrinters();
printerStore.setPrinter(705);
printerStore.setConfig(0);
</script>

<style scoped></style>
