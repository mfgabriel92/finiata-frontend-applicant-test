"use strict";

const AdditionalFileOperation = use("App/Operations/AdditionalFileOperation");

class AdditionalFileController {
  /**
   * Operation for fetching from the database
   *
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async fetch({ request, response, params }) {
    const op = new AdditionalFileOperation();
    op.invoiceId = params.invoiceId;

    const additionalFiles = await op.fetch();

    if (additionalFiles === false) {
      const error = op.getFirstError();
      return response.status(error.code).json(error);
    }

    return response.status(200).json(additionalFiles);
  }

  /**
   * Operation for inserting new additional file into the database
   *
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async store({ request, response, params }) {
    const op = new AdditionalFileOperation();
    op.invoiceId = params.invoiceId;
    op.file = request.file("additionalFile");
    op.description = request.input("description");

    const additionalFile = await op.store();

    if (additionalFile === false) {
      const error = op.getFirstError();
      return response.status(error.code).json(error);
    }

    return response.status(200).json(additionalFile);
  }
}

module.exports = AdditionalFileController;
