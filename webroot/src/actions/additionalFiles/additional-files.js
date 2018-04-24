import { RSAA } from "redux-api-middleware";

export const ADD_ADDITIONAL_FILE = "invoices:upload_invoice";
export const ADD_ADDITIONAL_FILE_SUCCESS = "invoices:upload_invoice_success";
export const ADD_ADDITIONAL_FILE_FAILURE = "invoices:upload_invoice_failure";

export function addAdditionalFile(invoiceId, data) {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1/api/v1/invoices/${invoiceFile[0].id}/additional-files`,
        method: "POST",
        body: data,
        types: [ADD_ADDITIONAL_FILE, ADD_ADDITIONAL_FILE_SUCCESS, ADD_ADDITIONAL_FILE_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [ADD_ADDITIONAL_FILE]: state => ({
    ...state,
    addingAdditionalFile: true,
  }),
  [ADD_ADDITIONAL_FILE_SUCCESS]: (state, action) => ({
    ...state,
    addingAdditionalFile: false,
    addingAdditionalFileSuccess: true,
    additionalFile: action.payload
  }),
  [ADD_ADDITIONAL_FILE_FAILURE]: (state, action) => ({
    ...state,
    addingAdditionalFile: false,
    addingAdditionalFileSuccess: false,
    addingAdditionalFileError: action.payload.response
  })
};

const initialState = {
  addingAdditionalFile: false,
  addingAdditionalFileSuccess: false,
  additionalFile: null,
  addingAdditionalFileError: []
};

export default function additionalFileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
