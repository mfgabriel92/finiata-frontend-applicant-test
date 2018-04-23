"use strict";

const Model = use("Model");

class Invoice extends Model {
  invoiceInfo() {
    return this.hasMany("App/Models/InvoiceInfo");
  }

  recipients() {
    return this.hasMany("App/Models/Recipient");
  }

  static directoryPath() {
    return "public/invoices";
  }
}

module.exports = Invoice;
