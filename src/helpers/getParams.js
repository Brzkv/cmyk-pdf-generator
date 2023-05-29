
export default class GetParams {

  static getParam(param) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlParamValue = urlParams.get(param);
    return urlParamValue;
  }


}

