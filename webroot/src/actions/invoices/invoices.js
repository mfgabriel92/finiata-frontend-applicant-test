import { RSAA } from "redux-api-middleware";

export const UPLOAD_INVOICE = "invoices:upload_invoice";
export const UPLOAD_INVOICE_SUCCESS = "invoices:upload_invoice_success";
export const UPLOAD_INVOICE_FAILURE = "invoices:upload_invoice_failure";

export const ADD_INVOICE_INFO = "invoices:add_invoice_info";
export const ADD_INVOICE_INFO_SUCCESS = "invoices:add_invoice_info_success";
export const ADD_INVOICE_INFO_FAILURE = "invoices:add_invoice_info_failure";

export function uploadInvoice(invoice) {
  return dispatch => {
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

export function addInvoiceInfo(invoiceId, data) {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/invoice-info/${invoiceId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: [ADD_INVOICE_INFO, ADD_INVOICE_INFO_SUCCESS, ADD_INVOICE_INFO_FAILURE]
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

  [ADD_INVOICE_INFO]: state => ({
    ...state,
    addingInvoiceInfo: true
  }),
  [ADD_INVOICE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    addingInvoiceInfo: false,
    addingInvoiceInfoSuccess: true,
  }),
  [ADD_INVOICE_INFO_FAILURE]: (state, action) => ({
    ...state,
    addingInvoiceInfo: false,
    addingInvoiceInfoSuccess: false,
  }),
};

const initialState = {
  uploadingInvoice: false,
  uploadingInvoiceSuccess: false,

  addingInvoiceInfo: false,
  addingInvoiceInfoSuccess: false,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
