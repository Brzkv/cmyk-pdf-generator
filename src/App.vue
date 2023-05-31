<script setup>
import { reactive } from 'vue';
import jsPDF from 'jspdf';
import GetParams from '../src/helpers/getParams';
import LoanInfo from '../src/helpers/getLoan';
import { usePrinterStore } from '../src/stores/printerStore';
import { computed } from 'vue';

const printerStore = usePrinterStore();
printerStore.loadPrinters();

const request = {
  printer: '',
  config: '',
};

const pdf_content = {
  filename: '',
  title: '',
  short_description: '',
  featured_media: '',
  features: [],
  config: {},
};

// Здесь я начал писать функционал для быстрой смены принтера находясь на сайте генератора
// Это для того, чтобы менеджер мог напрямую зайти на генератор и выбрать нужный принтер, конфиг и сделать пдф
// Вообще думаю стоит развивать именно этот пользовательский сценарий.
// Думаю нужно добавить pinia и загружать туда все сразу при загрузке приложения, а потом забирать то что нужно.
// Хранение в сторе позволит один раз все получить и потом уже менеджер спокойно будет выбирать конфиги и принтеры.
// async function getPrintersAjax() {
//   var data = await WPApi.getPosts('printers');
//   this.printers = data;
//   console.log(this.printers);
// },
// позже я добавил pinia для загрузки всех принтеров из стора
// Стор вызывается сразу в элементе select

// Если менеджер приходит в генератор с основного сайта с выбранными там параметрами
// то мы их ищем в url и потом уже выполняет подгрузку необходимых данных
// printer = id поста в wordpress
// config = index конфига в данных принтера (printer.acf.configurations[ index ])
// данный способ откладываем на потом, делаем все через селекторы
if (GetParams.getParam('printer') && GetParams.getParam('config')) {
  request.printer = GetParams.getParam('printer');
  request.config = GetParams.getParam('config');
}

// Получив данные запроса из url или select (id принтера и номер конфига)
// подгружаем данные о конкретном принетере по его id
// далее сразу вытаскиваем название, описание, картинку и так далее
async function collectPrinterData() {
  // Название будущего файла
  pdf_content.filename = printerStore.selected_printer.title.rendered;

  // Забираем основную инфу о принтере
  pdf_content.title = `The SOVA ${printerStore.selected_printer.title.rendered} UV-LED Digital Printer`;
  pdf_content.short_description = printerStore.selected_printer.acf.short_description;

  var image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = printerStore.selected_printer._embedded['wp:featuredmedia'][0].source_url;
  pdf_content.featured_media = image;

  // Забираем данные о features
  // features это посты, они переданы в виде id
  // поэтому нам нужно каждый подгрузить через апи
  pdf_content.features = [];

  // Забираем данные о выбранном конфиге
  // Конфиг мы получаем по индексу (индекс берем из url параметра)
  // Вся информация о конфигах хранится в массиве данных принтера,
  // тоесть делать дополнительных запросов не нужно, только забрать нужный конфиг
  pdf_content.config = 'config';
}

function generatePDF() {
  collectPrinterData();
  console.log(pdf_content);

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
  doc.setFontSize(32).text(pdf_content.title, 10, 10);
  doc.setFontSize(16).text(pdf_content.short_description, 10, 20);

  var img = new Image();
  img.src = pdf_content.featured_media;
  doc.addImage(img, 'png', 10, 78, 190, 150);

  // 3. Сохранение файла
  // Здесь нужно сделать генерацию названия файла по названию модели принтера
  // и даты на момент генерации
  var fileName = fileName.replace(/ /g, '_') + '.pdf';
  doc.save(fileName);
}

function htmlToPDF() {
  collectPrinterData();

  // 1. Настройки формата
  // Здесь надо подобрать настройки для формата А4
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });

  // 2. Генерация названия файла
  const date = new Date();
  const today = date.toLocaleDateString().replace('/', '_');
  const filename = pdf_content.filename.replace(/ /g, '_') + '_' + today + '.pdf';

  doc.html(document.querySelector('.pdf'), {
    // margin: 10,
    // x: 20,
    // y: 20,
    width: 210, //target width in the PDF document
    windowWidth: 800, //window width in CSS pixel
    html2canvas: {
      allowTaint: true,
      letterRendering: false,
      useCORS: true,
      logging: true,
    },
    callback: (doc) => {
      doc.save(filename);
    },
  });
}
</script>

<template>
  <div class="selectors">
    <select
      name="printers"
      id="printers"
      v-if="printerStore.printers"
      v-model="printerStore.selected_id"
      @change="printerStore.setPrinter(printerStore.selected_id)"
    >
      <option :value="null" selected>Select Printer</option>
      <option :value="printer.id" v-for="printer in printerStore.printers" :key="printer.id">
        {{ printer.title.rendered }}
      </option>
    </select>

    <select
      name="config"
      id="config"
      v-if="printerStore.selected_printer"
      v-model="printerStore.selected_config_index"
      @change="printerStore.setConfig(printerStore.selected_config_index)"
    >
      <option :value="index" v-for="(config, index) in printerStore.selected_printer.acf.configurations">
        {{ config.configuration }}
      </option>
    </select>

    <button @click="htmlToPDF">Save HTML to PDF</button>
  </div>

  <div class="preview" v-if="printerStore.selected_printer">
    <div class="pdf">
      <div class="page">
        <div>The SOVA {{ printerStore.selected_printer.title.rendered }} UV-LED Digital Printer</div>
        <div>
          {{ printerStore.selected_printer.acf.short_description }}
        </div>
        <div>
          <img
            :src="printerStore.selected_printer._embedded['wp:featuredmedia'][0].source_url"
            alt=""
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>
      </div>
      <div class="page">
        <div>Features</div>
        <ul>
          <li v-for="feature in printerStore.selected_printer.acf.features_posts">{{ feature.post_title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
