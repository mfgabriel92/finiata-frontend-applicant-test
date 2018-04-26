import {
  UPLOAD_INVOICE,
  UPLOAD_INVOICE_SUCCESS,
  UPLOAD_INVOICE_FAILURE,
  ADD_INVOICE_INFO,
  ADD_INVOICE_INFO_SUCCESS,
  ADD_INVOICE_INFO_FAILURE,
  DELETE_INVOICE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE
} from "./invoices/invoices";

import {
  ADD_RECIPIENT,
  ADD_RECIPIENT_SUCCESS,
  ADD_RECIPIENT_FAILURE,
  UPDATE_RECIPIENT,
  UPDATE_RECIPIENT_SUCCESS,
  UPDATE_RECIPIENT_FAILURE
} from "./recipients/recipients";

import {
  ADD_ADDITIONAL_FILE,
  ADD_ADDITIONAL_FILE_SUCCESS,
  ADD_ADDITIONAL_FILE_FAILURE,
  REMOVE_ADDITIONAL_FILE,
  REMOVE_ADDITIONAL_FILE_SUCCESS,
  REMOVE_ADDITIONAL_FILE_FAILURE
} from "./additionalFiles/additionalFiles";

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

const failureMessage = () => {
  return (state, action) => ({
    ...state,
    flashMessage: {
      message: action.payload,
      type: TYPE_ERROR
    }
  })
};

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
      message: "Wait while the invoice is being uploaded...",
      type: TYPE_PROCESSING
    }
  }),
  [UPLOAD_INVOICE_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Invoice uploaded.",
      type: TYPE_SUCCESS
    }
  }),

  [DELETE_INVOICE]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while the file is being removed...",
      type: TYPE_PROCESSING
    }
  }),
  [DELETE_INVOICE_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Invoice successfully removed.",
      type: TYPE_SUCCESS
    }
  }),

  [ADD_INVOICE_INFO]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while the invoice information is being added...",
      type: TYPE_PROCESSING
    }
  }),
  [ADD_INVOICE_INFO_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Invoice information successfully added.",
      type: TYPE_SUCCESS
    }
  }),

  [ADD_RECIPIENT]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while the recipient is being added...",
      type: TYPE_PROCESSING
    }
  }),
  [ADD_RECIPIENT_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Recipient successfully added.",
      type: TYPE_SUCCESS
    }
  }),

  [UPDATE_RECIPIENT]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while the recipient is being updated...",
      type: TYPE_PROCESSING
    }
  }),
  [UPDATE_RECIPIENT_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Recipient successfully updated.",
      type: TYPE_SUCCESS
    }
  }),

  [ADD_ADDITIONAL_FILE]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while an additional file is being added...",
      type: TYPE_PROCESSING
    }
  }),
  [ADD_ADDITIONAL_FILE_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Additional file successfully added.",
      type: TYPE_SUCCESS
    }
  }),

  [REMOVE_ADDITIONAL_FILE]: state => ({
    ...state,
    flashMessage: {
      message: "Wait while an additional file is being removed...",
      type: TYPE_PROCESSING
    }
  }),
  [REMOVE_ADDITIONAL_FILE_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Additional file successfully removed.",
      type: TYPE_SUCCESS
    }
  }),

  [UPLOAD_INVOICE_FAILURE]: failureMessage(),
  [DELETE_INVOICE_FAILURE]: failureMessage(),
  [ADD_INVOICE_INFO_FAILURE]: failureMessage(),
  [ADD_RECIPIENT_FAILURE]: failureMessage(),
  [UPDATE_RECIPIENT_FAILURE]: failureMessage(),
  [ADD_ADDITIONAL_FILE_FAILURE]: failureMessage(),
  [REMOVE_ADDITIONAL_FILE_FAILURE]: failureMessage(),
};

const initialState = {
  flashMessage: []
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}