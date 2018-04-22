"use strict";

const Model = use("Model");

class Invoice extends Model {
  invoiceInfo() {
    return this.hasMany("App/Models/InvoiceInfo");
  }

  static directoryPath() {
    return "public/invoices";
  }
}

module.exports = Invoice;
