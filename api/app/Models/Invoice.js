"use strict";

const Model = use("Model");

class Invoice extends Model {
  static directoryPath() {
    return "public/invoices";
  }
}

module.exports = Invoice;
