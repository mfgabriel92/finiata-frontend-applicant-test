import createReducer from "../lib/reducer";
import * as types from "../actions/api/types";

export const testGET = createReducer({}, {
  [types.TEST_GET](state, action) {
    return action
  }
});