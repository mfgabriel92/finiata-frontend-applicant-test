import {
  UPLOAD_INVOICE,
  UPLOAD_INVOICE_SUCCESS,
  UPLOAD_INVOICE_FAILURE,
  ADD_INVOICE_INFO,
  ADD_INVOICE_INFO_SUCCESS,
  ADD_INVOICE_INFO_FAILURE
} from "./invoices/invoices";

export const ADD_FLASH_MESSAGE = 'app:add_flash_message';
export const DELETE_FLASH_MESSAGE = 'app:delete_flash_message';

const TYPE_SUCCESS = "success";
const TYPE_PROCESSING = "processing";
const TYPE_ERROR = "error";

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage() {
  return {
    type: DELETE_FLASH_MESSAGE
  }
}

const ACTION_HANDLERS = {
  [ADD_FLASH_MESSAGE]: (state, action) => ({
    ...state,
    flashMessage: action.message
  }),
  [DELETE_FLASH_MESSAGE]: state => ({
    ...state,
    flashMessage: null
  }),
  [UPLOAD_INVOICE]: state => ({
    ...state,
    flashMessage: {
      message: "Uploading invoice...",
      type: TYPE_PROCESSING
    }
  }),
  [UPLOAD_INVOICE_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Invoice uploaded!",
      type: TYPE_SUCCESS
    }
  }),
  [ADD_INVOICE_INFO]: state => ({
    ...state,
    flashMessage: {
      message: "Submitting invoice information...",
      type: TYPE_PROCESSING
    }
  }),
  [ADD_INVOICE_INFO_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Information successfully included!",
      type: TYPE_SUCCESS
    }
  }),
};

const initialState = {
  flashMessage: []
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}