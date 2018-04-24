import { routerReducer as router } from "react-router-redux";
import app from "./app";
import invoices from "./invoices/invoices";
import recipients from "./recipients/recipients";

const reducers = {
  router,
  app,
  invoices,
  recipients,
};

export default reducers;
