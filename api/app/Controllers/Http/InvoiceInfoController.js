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
   * @param params
   * @returns {Promise<*>}
   */
    async store({ request, response, params }) {
      const op = new InvoiceInfoOperation();
      op.id = params.id;
      op.invoiceId = params.invoiceId;
      op.invoiceAmount = request.input("invoiceAmount");
      op.paymentTarget = request.input("paymentTarget");

      const invoiceInfo = await op.store();

      if (!invoiceInfo) {
        const error = op.getFirstError();
        return response.status(error.code).json(error);
      }

      return response.status(200).json(invoiceInfo);
    }
}

module.exports = InvoiceInfoController;
