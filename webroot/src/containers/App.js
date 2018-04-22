import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import Home from '../containers/Home';
import InvoiceInfo from '../containers/InvoiceInfo';

class AppContainer extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/invoice-info" component={InvoiceInfo}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppContainer;