import React, { Component } from "react";
import AppContainer from "./containers/App";
import FlashMessage from "./containers/common/FlashMessage";
import thunkMiddleware from "redux-thunk";
import reducers from "./actions/reducers";
import storage from "redux-persist/es/storage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createWhitelistFilter, createBlacklistFilter } from "redux-persist-transform-filter";
import { PersistGate } from 'redux-persist/es/integration/react';
import "./App.css"

const middleware = [thunkMiddleware, apiMiddleware];
const persistConfig = {
  storage,
  key: "root",
  transforms: [
    createWhitelistFilter("invoices", ["invoiceFile", "unsavedInvoiceFiles"]),
  ],
  blacklist: [
    "additionalFiles",
    "app",
    "recipients",
    "router"
  ]
};

const reducer = persistCombineReducers(persistConfig, reducers);
const store = createStore(
  reducer,
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <FlashMessage/>
          <AppContainer/>
        </PersistGate>
      </Provider>
    )
  }
}