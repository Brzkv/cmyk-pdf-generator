<script setup>
import jsPDF from 'jspdf';
import getParams from '../src/helpers/getParams';

const title = getParams.getParam('title');

const pdf = {
  title: 'The Sova Glyph',
};

const pdfData = {
  fileName: pdf.title,
  heading: pdf.title,
};

function savePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter',
  });

  // text is placed using x, y coordinates
  doc.setFontSize(16).text(pdfData.heading, 0.5, 1.0);

  // Saving file
  var fileName = pdfData.fileName.replace(/ /g, '_') + '.pdf';
  doc.save(fileName);
}
</script>

<template>
  <div>
    <h1>{{ title ? title : pdf.title }}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem harum soluta, adipisci ad molestias vel aperiam
      fuga, quasi iste assumenda illum deleniti? Totam officiis incidunt, veritatis maiores tempora explicabo fugit.
    </p>
  </div>
  <button @click="savePDF">Save PDF</button>
</template>

<style scoped></style>
