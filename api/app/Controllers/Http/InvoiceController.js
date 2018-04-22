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
    op.store();

    const store = await op.store();

    if (!store) {
      return op.getFirstError();
    }

    return response.send(200);
  }
}

module.exports = InvoiceController;
