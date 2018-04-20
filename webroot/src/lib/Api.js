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

  static FILE(route, params) {
    return this.xhr(route, params, "POST", false)
  }

  static xhr(route, params, verb, stringify = true) {
    let host = `http://127.0.0.1:3333/api/v1/${route}/`;
    let data = JSON.stringify(params);

    if (!stringify) {
      data = params;
    }

    let options = Object.assign({ method: verb }, params ? { body: data } : null);

    return fetch(host, options).then((res) => {
      return res.ok ? res.json() : res.json().then((err) => {
        throw err
      })
    })
  }
}

export default Api;