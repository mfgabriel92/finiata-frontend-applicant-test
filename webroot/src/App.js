import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
import AppContainer from "./containers/App";
import "./App.css"

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    )
  );

  return createStore(reducer, initialState, enhancer)
}

export default class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <AppContainer/>
      </Provider>
    )
  }
}