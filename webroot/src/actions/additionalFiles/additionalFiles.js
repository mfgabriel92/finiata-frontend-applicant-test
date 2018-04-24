import { RSAA } from "redux-api-middleware";

export const FETCH_ADDITIONAL_FILE = "invoices:fetch_additional";
export const FETCH_ADDITIONAL_FILE_SUCCESS = "invoices:fetch_additional_success";
export const FETCH_ADDITIONAL_FILE_FAILURE = "invoices:fetch_additional_failure";


export const ADD_ADDITIONAL_FILE = "invoices:add_additional";
export const ADD_ADDITIONAL_FILE_SUCCESS = "invoices:add_additional_success";
export const ADD_ADDITIONAL_FILE_FAILURE = "invoices:add_additional_failure";

export function fetchAdditionalFiles() {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/invoices/${invoiceFile[0].id}/additional-files`,
        method: "GET",
        types: [FETCH_ADDITIONAL_FILE, FETCH_ADDITIONAL_FILE_SUCCESS, FETCH_ADDITIONAL_FILE_FAILURE]
      }
    })
  }
}

export function addAdditionalFile(data) {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/invoices/${invoiceFile[0].id}/additional-files`,
        method: "POST",
        body: data,
        types: [ADD_ADDITIONAL_FILE, ADD_ADDITIONAL_FILE_SUCCESS, ADD_ADDITIONAL_FILE_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [FETCH_ADDITIONAL_FILE]: state => ({
    ...state,
    fetchingAdditionalFile: true,
    fetchingAdditionalFileSuccess: false,
    addingAdditionalFileSuccess: false,
  }),
  [FETCH_ADDITIONAL_FILE_SUCCESS]: (state, action) => ({
    ...state,
    fetchingAdditionalFile: false,
    fetchingAdditionalFileSuccess: true,
    additionalFiles: action.payload
  }),
  [FETCH_ADDITIONAL_FILE_FAILURE]: (state, action) => ({
    ...state,
    fetchingAdditionalFile: false,
    fetchingAdditionalFileSuccess: false,
    fetchingAdditionalFileError: action.payload.response
  }),

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
  fetchingAdditionalFile: false,
  fetchingAdditionalFileSuccess: false,
  additionalFiles: null,
  fetchingAdditionalFileError: [],

  addingAdditionalFile: false,
  addingAdditionalFileSuccess: false,
  additionalFile: null,
  addingAdditionalFileError: []
};

export default function additionalFileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
