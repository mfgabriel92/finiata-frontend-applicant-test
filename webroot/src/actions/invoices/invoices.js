import { RSAA } from "redux-api-middleware";

export const UPLOAD_INVOICE = "invoices:upload_invoice";
export const UPLOAD_INVOICE_SUCCESS = "invoices:upload_invoice_success";
export const UPLOAD_INVOICE_FAILURE = "invoices:upload_invoice_failure";

export function uploadInvoice(invoice) {
  return (dispatch, getState) => {
    return dispatch({
      [RSAA]: {
        endpoint: "http://127.0.0.1:3333/api/v1/invoices",
        method: "POST",
        body: invoice,
        types: [UPLOAD_INVOICE, UPLOAD_INVOICE_SUCCESS, UPLOAD_INVOICE_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [UPLOAD_INVOICE]: state => ({
    ...state,
    uploadingInvoice: true
  }),
  [UPLOAD_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    uploadingInvoice: false,
    uploadingInvoiceSuccess: true,
  }),
  [UPLOAD_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    uploadingInvoice: false,
    uploadingInvoiceSuccess: false,
  }),
};

const initialState = {
  uploadingInvoice: false,
  uploadingInvoiceSuccess: false
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
