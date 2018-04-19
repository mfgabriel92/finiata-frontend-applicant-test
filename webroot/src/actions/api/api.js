import * as types from "./types";
import Api from "../../lib/Api";

export function testGET() {
  return(dispatch) => {
    return Api.GET("users").then((res) => {
      dispatch({
        type: types.TEST_GET,
        data: res
      })
    })
  }
}