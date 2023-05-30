import axios, { Axios } from "axios";

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

  static async getPosts(postType) {
    var params = new URLSearchParams();
    params.append('action', 'cmyk_ajax_get_posts');
    params.append('post_type', postType);
    return await axios.post('https://cmykengineering.com/wp-admin/admin-ajax.php', params)
      .then(response => {
        console.log('response: ', response)
        console.log('response data: ', response.data)
        return response.data
      }).catch(error => console.log(error))
  }

};





