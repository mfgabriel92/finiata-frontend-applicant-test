import * as types from "./types";
import Api from "../../lib/Api";

export function uploadInvoice(invoice) {
  return dispatch => {
    return Api.FILE("invoices", invoice).then((res) => {
      dispatch({
        type: types.UPLOAD_INVOICE,
        data: res
      })
    })
  }
}