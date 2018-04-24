"use strict";

const RecipientOperation = use("App/Operations/RecipientOperation");

/**
 * Controller class for accessing operations for recipients table
 *
 * @author gabriel
 * @class
 */
class RecipientController {
  /**
   * Operation for storing into the database
   *
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async store({ request, response, params }) {
    const op = new RecipientOperation();
    op.id = params.id;
    op.invoiceId = params.invoiceId;
    op.name = request.input("name");
    op.surname = request.input("surname");
    op.address = request.input("address");
    op.phone = request.input("phone");

    const recipient = await op.store();

    if (recipient === false) {
      const error = op.getFirstError();
      return response.status(error.code).json(error);
    }

    return response.status(200).json(recipient);
  }

  /**
   * Operation for fetching recipients from database
   *
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async fetch({ request, response, params }) {
    const op = new RecipientOperation();
    op.invoiceId = params.invoiceId;

    const recipient = await op.fetch();

    if (recipient === false) {
      const error = op.getFirstError();
      return response.status(error.code).json(error);
    }

    return response.status(200).json(recipient);
  }
}

module.exports = RecipientController;
