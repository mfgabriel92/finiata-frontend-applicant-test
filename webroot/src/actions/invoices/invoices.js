import { RSAA } from "redux-api-middleware";
import _ from "lodash";

export const FETCH_INVOICES = "invoices:fetch_invoices_invoice";
export const FETCH_INVOICES_SUCCESS = "invoices:fetch_invoices_success";
export const FETCH_INVOICES_FAILURE = "invoices:fetch_invoices_failure";

export const UPLOAD_INVOICE = "invoices:upload_invoice";
export const UPLOAD_INVOICE_SUCCESS = "invoices:upload_invoice_success";
export const UPLOAD_INVOICE_FAILURE = "invoices:upload_invoice_failure";

export const SET_INVOICE_FILE = "invoices:set_invoice_file";
export const SET_UNSAVED_INVOICE_FILE = "invoices:set_unsaved_invoice_file";

export const DELETE_INVOICE = "invoices:delete_invoice";
export const DELETE_INVOICE_SUCCESS = "invoices:delete_invoice_success";
export const DELETE_INVOICE_FAILURE = "invoices:delete_invoice_failure";

export const DELETE_INVOICE_FILE = "invoices:delete_invoice_file";

export const ADD_INVOICE_INFO = "invoices:add_invoice_info";
export const ADD_INVOICE_INFO_SUCCESS = "invoices:add_invoice_info_success";
export const ADD_INVOICE_INFO_FAILURE = "invoices:add_invoice_info_failure";

export function setInvoiceFile(file) {
  return (dispatch) => {
    dispatch({
      type: SET_INVOICE_FILE,
      payload: file
    })
  }
}

export function setUnsavedInvoiceFile(file) {
  return (dispatch) => {
    dispatch({
      type: SET_UNSAVED_INVOICE_FILE,
      payload: file
    })
  }
}

export function deleteInvoiceFile(file) {
  return (dispatch) => {
    dispatch({
      type: DELETE_INVOICE_FILE,
    });

    const invoices = JSON.parse(localStorage.getItem("persist:root"));
    const invoiceFiles = JSON.parse(invoices.invoices).invoiceFile;
    const index = _.findIndex(invoiceFiles, { filename: file.filename });

    console.log(index);
  }
}

export function fetchInvoices() {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: "http://127.0.0.1:3333/api/v1/invoices",
        method: "GET",
        types: [FETCH_INVOICES, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE]
      }
    })
  }
}

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

export function deleteInvoice() {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/invoices/${invoiceFile[0].id}`,
        method: "DELETE",
        types: [DELETE_INVOICE, DELETE_INVOICE_SUCCESS, DELETE_INVOICE_FAILURE]
      }
    })
  }
}

export function addInvoiceInfo(data) {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/invoices-info/${invoiceFile[0].id}`,
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
  [FETCH_INVOICES]: state => ({
    ...state,
    fetchingInvoice: true,
    addingInvoiceInfoSuccess: false,
    deletingInvoiceSuccess: false,
    uploadingInvoiceSuccess: false
  }),
  [FETCH_INVOICES_SUCCESS]: (state, action) => ({
    ...state,
    fetchingInvoice: false,
    fetchingInvoiceSuccess: true,
    allInvoices: action.payload
  }),
  [FETCH_INVOICES_FAILURE]: (state, action) => ({
    ...state,
    fetchingInvoice: false,
    fetchingInvoiceSuccess: false,
    fetchingInvoiceError: action.payload.response
  }),

  [UPLOAD_INVOICE]: state => ({
    ...state,
    uploadingInvoice: true,
    fetchingInvoiceSuccess: false,
    addingInvoiceInfoSuccess: false,
    deletingInvoiceSuccess: false,
  }),
  [UPLOAD_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    uploadingInvoice: false,
    uploadingInvoiceSuccess: true,
    invoice: action.payload
  }),
  [UPLOAD_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    uploadingInvoice: false,
    uploadingInvoiceSuccess: false,
    uploadingInvoiceError: action.payload.response
  }),

  [SET_INVOICE_FILE]: (state, action) => ({
    ...state,
    uploadingInvoiceSuccess: false,
    invoiceFile: [
      ...state,
      action.payload
    ]
  }),

  [SET_UNSAVED_INVOICE_FILE]: (state, action) => ({
    ...state,
    uploadingInvoiceSuccess: false,
    unsavedInvoiceFiles: [
      ...state,
      action.payload
    ],
    invoiceFile: null
  }),

  [DELETE_INVOICE]: state => ({
    ...state,
    deletingInvoice: true,
    addingInvoiceInfoSuccess: false,
    uploadingInvoiceSuccess: false,
  }),
  [DELETE_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    deletingInvoice: false,
    deletingInvoiceSuccess: true,
    invoice: action.payload
  }),
  [DELETE_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    deletingInvoice: false,
    deletingInvoiceSuccess: false,
    deletingInvoiceError: action.payload.message
  }),

  [ADD_INVOICE_INFO]: state => ({
    ...state,
    addingInvoiceInfo: true,
    uploadingInvoiceSuccess: false,
    deletingInvoiceSuccess: false
  }),
  [ADD_INVOICE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    addingInvoiceInfo: false,
    addingInvoiceInfoSuccess: true,
    invoiceInfo: action.payload,
  }),
  [ADD_INVOICE_INFO_FAILURE]: (state, action) => ({
    ...state,
    addingInvoiceInfo: false,
    addingInvoiceInfoSuccess: false,
    addingInvoiceInfoErrors: action.payload.response
  }),
};

const initialState = {
  fetchingInvoice: false,
  fetchingInvoiceSuccess: false,
  allInvoices: null,
  fetchingInvoiceError: [],

  uploadingInvoice: false,
  uploadingInvoiceSuccess: false,
  invoice: null,
  uploadingInvoiceError: [],

  deletingInvoice: false,
  deletingInvoiceSuccess: false,
  deletingInvoiceError: [],

  invoiceFile: null,
  // unsavedInvoiceFiles: [],

  addingInvoiceInfo: false,
  addingInvoiceInfoSuccess: false,
  invoiceInfo: null,
  addingInvoiceInfoErrors: null
};

export default function invoiceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
