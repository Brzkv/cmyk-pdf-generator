export default class WPApi {

  static async getPrinter(id) {
    return await fetch("https://cmykengineering.com/wp-json/wp/v2/printers/" + id + "?_embed")
      .then(response => {
        return response.json();
      }).then(data => {
        return data;
      }).catch(error => {
        console.log('wpApi.js', error);
      });
  }

};





