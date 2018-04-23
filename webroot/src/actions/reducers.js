import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import app from "./app";
import invoices from "./invoices/invoices";
import recipients from "./recipients/recipients";

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
    app,
    invoices,
    recipients,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer;
