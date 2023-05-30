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

      printers: null,
      printer: null,

      fileName: 'filename',
      heading: '',
      loanInfo: '',

      pdf_content: {
        title: '',
        excerpt: '',
        featured_media: '',
        features: [],
        config: {},
      },
    };
  },
  beforeMount() {
    this.getParams();
    this.getPrinter();
    this.getPrintersAjax();
  },
  methods: {
    // Здесь я начал писать функционал для быстрой смены принтера находясь на сайте генератора
    // Это для того, чтобы менеджер мог напрямую зайти на генератор и выбрать нужный принтер, конфиг и сделать пдф
    // Вообще думаю стоит развивать именно этот пользовательский сценарий.
    // Думаю нужно добавить pinia и загружать туда все сразу при загрузке приложения, а потом забирать то что нужно.
    // Хранение в сторе позволит один раз все получить и потом уже менеджер спокойно будет выбирать конфиги и принтеры.
    async getPrintersAjax() {
      var data = await WPApi.getPosts('printers');
      this.printers = data;
      console.log(this.printers);
    },

    // Если менеджер приходит в генератор с основного сайта с выбранными там параметрами
    // то мы их ищем в url и потом уже выполняет подгрузку необходимых данных
    getParams() {
      this.request.printer = GetParams.getParam('printer') ? GetParams.getParam('printer') : null;
      this.request.config = GetParams.getParam('config') ? GetParams.getParam('config') : null;
    },

    // Получив данные запроса из url (id принтера и номер конфига)
    // подгружаем данные о конкретном принетере по его id
    // далее сразу вытаскиваем название, описание, картинку и так далее
    async getPrinter() {
      var data = await WPApi.getPrinter(this.request.printer);
      this.printer = data;
      console.log(this.printer);

      // Забираем основную инфу о принтере
      this.pdf_content.title = this.printer.title.rendered;
      this.pdf_content.excerpt = this.printer.excerpt.rendered;
      this.pdf_content.featured_media = this.printer._embedded['wp:featuredmedia'][0].source_url;

      // Забираем данные о features
      // features это посты, они переданы в виде id
      // поэтому нам нужно каждый подгрузить через апи
      this.pdf_content.features = [];

      // Забираем данные о выбранном конфиге
      // Конфиг мы получаем по индексу (индекс берем из url параметра)
      // Вся информация о конфигах хранится в data принтера,
      // тоесть делать дополнительных запросов не нужно, только забрать нужный конфиг
      this.pdf_content.config = this.printer.acf.configurations[this.request.config];
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
  <select name="printers" id="printers" v-if="printers">
    <option value="Select printer" selected>Select Printer</option>
    <option :value="printer.ID" v-for="(printer, i) in printers" :key="i">{{ printer.post_title }}</option>
  </select>

  <hr />

  <div v-if="printer">
    <p>Title: {{ pdf_content.title }}</p>
    <p>Media: {{ pdf_content.featured_media }}</p>
    <p>Features: {{ pdf_content.features }}</p>
    <p>Config: {{ pdf_content.config }}</p>
    <p>
      <span>Description:</span>
      <span v-html="pdf_content.excerpt"></span>
    </p>
  </div>

  <hr />

  <button @click="savePDF">Save PDF</button>
</template>

<style scoped></style>
