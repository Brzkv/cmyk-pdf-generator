import { defineStore } from 'pinia'
import WPApi from '../helpers/wpApi.js'

export const usePrinterStore = defineStore({
  id: "PrinterStore",
  state: () => {
    return {
      printers: null,
      selected_id: null,
      selected_printer: null,
      selected_config_index: null,
      selected_config: null
    }
  },
  actions: {
    setConfig(index) {
      this.selected_config = this.selected_printer.acf.configurations[index]
    },
    setPrinter(id) {
      var printer = this.printers.filter(printer => printer.id == id)[0]
      this.selected_printer = printer

      // сброс выбора конфига
      this.selected_config = null
      this.selected_config_index = null

    },
    async loadPrinters() {
      this.printers = await WPApi.getPrinters();
      // if (sessionStorage.getItem('printers')) {
      //   this.printers = JSON.parse(sessionStorage.getItem('printers'));
      //   console.log('Printers loaded from sessionStorage')
      // } else {
      //   sessionStorage.setItem('printers', JSON.stringify(this.printers));
      //   console.log('Printers loaded from API')
      // }
    }
  }
})

