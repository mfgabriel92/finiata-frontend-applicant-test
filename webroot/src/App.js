import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import makeRootReducer from "./actions/reducers";
import AppContainer from "./containers/App";
import FlashMessage from "./containers/common/FlashMessage";
import "./App.css"

const middleware = [thunkMiddleware, apiMiddleware];
const store = createStore(
  makeRootReducer(),
  compose(
    applyMiddleware(...middleware),
  )
);

store.asyncRecuers = {};

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <FlashMessage/>
          <AppContainer/>
        </div>
      </Provider>
    )
  }
}