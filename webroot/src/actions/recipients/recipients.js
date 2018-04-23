import { RSAA } from "redux-api-middleware";

export const GET_RECIPIENTS = "invoices:get_recipients";
export const GET_RECIPIENTS_SUCCESS = "invoices:get_recipients_success";
export const GET_RECIPIENTS_FAILURE = "invoices:get_recipients_failure";

export const ADD_RECIPIENT = "invoices:add_recipient";
export const ADD_RECIPIENT_SUCCESS = "invoices:add_recipient_success";
export const ADD_RECIPIENT_FAILURE = "invoices:add_recipient_failure";

export function getRecipients(invoiceId) {
  return (dispatch) => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:3333/api/v1/recipients/${invoiceId}`,
        method: "GET",
        types: [GET_RECIPIENTS, GET_RECIPIENTS_SUCCESS, GET_RECIPIENTS_FAILURE]
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
    addingRecipientError: action.payload
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
