<script>
import jsPDF from 'jspdf';
import GetParams from '../src/helpers/getParams';
import WPApi from '../src/helpers/wpApi';
import LoadInfo from '../src/helpers/getLoan';

export default {
  data() {
    return {
      request: {
        printer: '',
        config: '',
      },

      printer: null,

      fileName: 'filename',
      heading: '',
      loanInfo: '',

      pdf_content: {
        title: '',
        excerpt: '',
        featured_media: '',
      },
    };
  },
  beforeMount() {
    this.getParams();
    this.getPrinter();
  },
  methods: {
    getParams() {
      this.request.printer = GetParams.getParam('printer') ? GetParams.getParam('printer') : null;
      this.request.config = GetParams.getParam('config') ? GetParams.getParam('config') : null;
    },

    async getPrinter() {
      var data = await WPApi.getPrinter(this.request.printer);
      this.printer = data;
      console.log(this.printer);

      // Забираем основную инфу о принтере
      this.pdf_content.title = this.printer.title.rendered;
      this.pdf_content.excerpt = this.printer.excerpt.rendered;
      this.pdf_content.featured_media = this.printer._embedded['wp:featuredmedia'][0].source_url;
    },

    savePDF() {
      // 1. Настройки формата
      // Здесь надо подобрать настройки для формата А4
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // 2. Создание, настройка и позиционированние элемента
      // Здесь мы собираем контент нашей  pdf'ки
      // https://artskydj.github.io/jsPDF/docs/jsPDF.html
      doc.setFontSize(32).text(this.pdf_content.title, 0.5, 1.0);
      doc.setFontSize(16).text(this.pdf_content.excerpt, 2, 2.0);

      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.pdf_content.featured_media;
      doc.addImage(img, 'png', 10, 78, 200, 150);

      // 3. Сохранение файла
      // Здесь нужно сделать генерацию названия файла по названию модели принтера
      // и даты на момент генерации
      var fileName = this.fileName.replace(/ /g, '_') + '.pdf';
      this.generating_status = true;
      doc.save(fileName);
    },
  },
};
</script>

<template>
  <div>
    <div>
      <div v-if="printer">
        <p>{{ pdf_content.title }}</p>
        <p v-html="pdf_content.excerpt"></p>
        <p>{{ pdf_content.featured_media }}</p>
      </div>
      <div v-if="request.config">
        <p>Requested config: {{ request.config }}</p>
      </div>
    </div>
  </div>
  <button @click="savePDF">Save PDF</button>
</template>

<style scoped></style>
