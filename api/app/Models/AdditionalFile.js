"use strict";

const Model = use("Model");

class AdditionalFile extends Model {
  invoice() {
    return this.belongsTo("App/Models/Invoice", "invoice_id", "id");
  }
}

module.exports = AdditionalFile;
