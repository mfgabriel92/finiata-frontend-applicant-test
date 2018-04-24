"use strict";

const InvoiceOperation = use("App/Operations/InvoiceOperation");

/**
 * Controller class for accessing operations for invoices table
 *
 * @author gabriel
 * @class
 */
class InvoiceController {
  /**
   * Operation for storing into the database
   *
   * @param request
   * @param response
   * @returns {Promise<{limit, strict, types}|any>}
   */
  async store({ request, response }) {
    const op = new InvoiceOperation();

    op.invoice = request.file("invoice");

    const invoice = await op.store();

    if (!invoice) {
      const error = op.getFirstError();
      return response.status(error.code).send(error.message);
    }

    return response.status(200).send(invoice);
  }
}

module.exports = InvoiceController;
