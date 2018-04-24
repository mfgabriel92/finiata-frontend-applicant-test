import { routerReducer as router } from "react-router-redux";
import app from "./app";
import invoices from "./invoices/invoices";
import recipients from "./recipients/recipients";
import additionalFiles from "./additionalFiles/additionalFiles";

const reducers = {
  router,
  app,
  invoices,
  recipients,
  additionalFiles
};

export default reducers;
