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
   * Operation for fetching from the database
   *
   * @param request
   * @param response
   * @returns {Promise<{limit, strict, types}|any>}
   */
  async fetch({ request, response }) {
    const op = new InvoiceOperation();
    const invoices = await op.fetch();

    if (!invoices) {
      const error = op.getFirstError();
      return response.status(error.code).json(error.message);
    }

    return response.status(200).json(invoices);
  }

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
      return response.status(error.code).json(error.message);
    }

    return response.status(200).json(invoice);
  }

  /**
   * Deletes an invoice from the database and everything related to it
   *
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async destroy({ request, response, params }) {
    const op = new InvoiceOperation();
    op.id = params.id;

    const invoice = await op.destroy();

    if (!invoice) {
      const error = op.getFirstError();
      return response.status(error.code).json(error.message);
    }

    return response.status(200).json(invoice);
  }
}

module.exports = InvoiceController;
