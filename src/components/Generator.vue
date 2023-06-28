<script setup>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

async function generate() {
  // 1. Настройки формата
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: [210, 297],
  });

  // 2. Генерация названия файла
  const date = new Date();
  const today = date.toLocaleDateString().replace('/', '_');
  const filename = 'proposal' + '_' + today + '.pdf';

  // 1mm = 2.8346472px
  // 1px = 0.35277777777777775mm

  // 3. Конвертация всех страниц из html в pdf
  doc.html(document.querySelector('.pages'), {
    width: 190,
    windowWidth: 800,
    margin: 10,
    html2canvas: {
      letterRendering: true,
    },
    callback: (doc) => {
      doc.save(filename);
    },
  });
}

function print() {
  window.print();
}
</script>

<template>
  <div class="buttons">
    <button id="generate" @click="generate">Save</button>
    <button id="print" @click="print">Print</button>
  </div>
</template>

<style scoped>
.buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-bottom: 12px;
  margin-left: 12px;
  z-index: 999;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
}
button {
  font-size: 16px;
  color: white;
  background: rgb(91, 91, 251);
  padding: 8px 12px;
  border-radius: 99px;
  border: none;
}
</style>
