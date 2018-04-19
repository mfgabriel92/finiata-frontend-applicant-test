class Api {
  static headers() {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }

  static GET(route) {
    return this.xhr(route, null, "GET")
  }

  static POST(route, params) {
    return this.xhr(route, params, "POST")
  }

  static PUT(route, params) {
    return this.xhr(route, params, "PUT")
  }

  static DELETE(route, params) {
    return this.xhr(route, params, "DELETE")
  }

  static xhr(route, params, verb) {
    const host = `https://jsonplaceholder.typicode.com/${route}/`;

    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers();

    return fetch(host, options).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => { throw err })
    })
  }
}

export default Api;