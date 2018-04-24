"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const AdditionalFile = use("App/Models/AdditionalFile");

/**
 * Operations for invoices table
 *
 * @author gabriel
 * @class
 */
class AdditionalFileOperation extends Operation {
  /**
   * Initial values
   */
  constructor() {
    super();

    this.invoiceId = null;
  }
  /**
   * Operation for fetching from the database
   *
   * @returns {Promise<*>}
   */
  async fetch() {
    const rules = {
      invoiceId: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    return await AdditionalFile.query().where("invoice_id", this.invoiceId);
  }
}

module.exports = AdditionalFileOperation;