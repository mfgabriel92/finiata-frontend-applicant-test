"use strict";

const Model = use("Model");

class InvoiceInfo extends Model {
  static get table() {
    return "invoice_info";
  }

  invoice() {
    return this.belongsTo("App/Models/Invoice", "invoice_id", "id");
  }
}

module.exports = InvoiceInfo;
