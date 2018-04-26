import { RSAA } from "redux-api-middleware";

export const FETCH_RECIPIENT = "invoices:fetch_recipient";
export const FETCH_RECIPIENT_SUCCESS = "invoices:fetch_recipient_success";
export const FETCH_RECIPIENT_FAILURE = "invoices:fetch_recipient_failure";

export const ADD_RECIPIENT = "invoices:add_recipient";
export const ADD_RECIPIENT_SUCCESS = "invoices:add_recipient_success";
export const ADD_RECIPIENT_FAILURE = "invoices:add_recipient_failure";

export const UPDATE_RECIPIENT = "invoices:updating_recipient";
export const UPDATE_RECIPIENT_SUCCESS = "invoices:updating_recipient_success";
export const UPDATE_RECIPIENT_FAILURE = "invoices:updating_recipient_failure";

export function fetchRecipient() {
  return (dispatch, getState) => {
    console.log(getState());
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${invoiceFile.id}`,
        method: "GET",
        types: [FETCH_RECIPIENT, FETCH_RECIPIENT_SUCCESS, FETCH_RECIPIENT_FAILURE]
      }
    })
  }
}


export function addRecipient(data) {
  return (dispatch, getState) => {
    const { invoices: { invoiceFile } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${invoiceFile.id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: [ADD_RECIPIENT, ADD_RECIPIENT_SUCCESS, ADD_RECIPIENT_FAILURE]
      }
    })
  }
}

export function updateRecipient(recipientId, data) {
  return (dispatch) => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${recipientId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: [UPDATE_RECIPIENT, UPDATE_RECIPIENT_SUCCESS, UPDATE_RECIPIENT_FAILURE]
      }
    })
  }
}


const ACTION_HANDLERS = {
  [FETCH_RECIPIENT]: state => ({
    ...state,
    fetchingRecipient: true,
    fetchingRecipientSuccess: false,
    addingRecipientSuccess: false,
    updatingRecipientSuccess: false,
  }),
  [FETCH_RECIPIENT_SUCCESS]: (state, action) => ({
    ...state,
    fetchingRecipient: false,
    fetchingRecipientSuccess: true,
    recipient: action.payload
  }),
  [FETCH_RECIPIENT_FAILURE]: (state, action) => ({
    ...state,
    fetchingRecipient: false,
    fetchingRecipientSuccess: false,
    fetchingRecipientError: action.payload
  }),
  
  [ADD_RECIPIENT]: state => ({
    ...state,
    addingRecipient: true
  }),
  [ADD_RECIPIENT_SUCCESS]: (state, action) => ({
    ...state,
    addingRecipient: false,
    addingRecipientSuccess: true,
    recipient: action.payload
  }),
  [ADD_RECIPIENT_FAILURE]: (state, action) => ({
    ...state,
    addingRecipient: false,
    addingRecipientSuccess: false,
    addingRecipientError: action.payload.response
  }),

  [UPDATE_RECIPIENT]: state => ({
    ...state,
    updatingRecipient: true
  }),
  [UPDATE_RECIPIENT_SUCCESS]: (state, action) => ({
    ...state,
    updatingRecipient: false,
    updatingRecipientSuccess: true,
    recipient: action.payload
  }),
  [UPDATE_RECIPIENT_FAILURE]: (state, action) => ({
    ...state,
    updatingRecipient: false,
    updatingRecipientSuccess: false,
    updatingRecipientError: action.payload.response
  }),
};

const initialState = {
  addingRecipient: false,
  addingRecipientSuccess: false,
  addingRecipientError: null,

  updatingRecipient: false,
  updatingRecipientSuccess: false,
  updatingRecipientError: null,

  recipient: null,
};

export default function recipientReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
