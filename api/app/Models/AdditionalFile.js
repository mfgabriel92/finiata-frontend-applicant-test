"use strict";

const Model = use("Model");

class AdditionalFile extends Model {
  invoice() {
    return this.belongsTo("App/Models/Invoice", "invoice_id", "id");
  }

  static directoryPath(invoiceId) {
    return `public/invoices/invoice_${invoiceId}/additional-files`;
  }
}

module.exports = AdditionalFile;
