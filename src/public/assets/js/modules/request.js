export default class Request {
  constructor(url) {
    this.url = url;
  }

  async fetchUrl() {
    try {
      const responseData = await fetch(this.url);
      const responseJson = await responseData.json();
      this.jsonData = responseJson;
    } catch (error) {
      console.log(error);
    }
  }
}
