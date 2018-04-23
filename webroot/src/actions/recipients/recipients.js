import { RSAA } from "redux-api-middleware";

export const FETCH_RECIPIENT = "invoices:fetch_recipient";
export const FETCH_RECIPIENT_SUCCESS = "invoices:fetch_recipient_success";
export const FETCH_RECIPIENT_FAILURE = "invoices:fetch_recipient_failure";

export const ADD_RECIPIENT = "invoices:add_recipient";
export const ADD_RECIPIENT_SUCCESS = "invoices:add_recipient_success";
export const ADD_RECIPIENT_FAILURE = "invoices:add_recipient_failure";

export function fetchRecipient(invoiceId) {
  return (dispatch) => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${invoiceId}`,
        method: "GET",
        types: [FETCH_RECIPIENT, FETCH_RECIPIENT_SUCCESS, FETCH_RECIPIENT_FAILURE]
      }
    })
  }
}


export function addRecipient(invoiceId, data) {
  return (dispatch) => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${invoiceId}`,
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

const ACTION_HANDLERS = {
  [FETCH_RECIPIENT]: state => ({
    ...state,
    fetchingRecipient: true
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
};

const initialState = {
  addingRecipient: false,
  addingRecipientSuccess: false,
  addingRecipientError: null
};

export default function recipientReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
