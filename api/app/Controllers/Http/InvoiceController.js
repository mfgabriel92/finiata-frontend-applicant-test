"use strict";

const InvoiceOperation = use("App/Operations/InvoiceOperation");

class InvoiceController {
  async store({ request, response }) {
    const invoiceOperation = new InvoiceOperation();

    invoiceOperation.invoice = request.file("invoice");
    invoiceOperation.store();

    return await response.json(invoiceOperation);
  }
}

module.exports = InvoiceController;
