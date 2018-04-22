"use strict";

const InvoiceInfoOperation = use("App/Operations/InvoiceInfoOperation");

/**
 * Controller class for accessing operations for invoice_info table
 *
 * @author gabriel
 * @class
 */
class InvoiceInfoController {
  /**
   * Operation for storing into the database
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const op = new InvoiceInfoOperation();
    op.invoiceId = request.input("invoiceId");
    op.invoiceAmount = request.input("invoiceAmount");
    op.paymentTarget = request.input("paymentTarget");

    const store = await op.store();

    if (!store) {
      return op.getFirstError();
    }

    return response.send(200);
  }
}

module.exports = InvoiceInfoController;
