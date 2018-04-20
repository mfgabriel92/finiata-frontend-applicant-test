"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const Invoice = use("App/Models/Invoice");
const moment = use("moment");

class InvoiceOperation extends Operation {
  constructor() {
    super();

    this.invoice = [];
  }

  async store() {
    const file = this.invoice;
    const name = moment().format("YYYY-MM-DD-HH-mm-ss") + "_" + file.clientName;

    await file.move(Invoice.directoryPath(), {
      name
    });

    if (!file.moved()) {
      return file.error();
    }

    await Invoice.create({
      filename: name
    });

    return true;
  }
}

module.exports = InvoiceOperation;