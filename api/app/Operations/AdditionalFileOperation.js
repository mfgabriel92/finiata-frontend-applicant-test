"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const AdditionalFile = use("App/Models/AdditionalFile");
const moment = use("moment");

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
    this.file = null;
    this.description = null;
  }

  /**
   * Common rules
   *
   * @returns {{invoiceId: string}}
   */
  get rules() {
    return {
      invoiceId: "required"
    }
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

  /**
   * Operations for inserting new additional file into the database
   *
   * @returns {Promise<void>}
   */
  async store() {
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

    const file = this.file;
    const name = moment().format("YYYY-MM-DD-HH-mm-ss") + "_" + file.clientName;
    const path = AdditionalFile.directoryPath(this.invoiceId);

    await file.move(path, {
      name
    });

    if (!file.moved()) {
      return file.error();
    }

    try {
      return await AdditionalFile.create({
        invoice_id: this.invoiceId,
        filename: name,
        path: path + "/" + name,
        description: this.description
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }
}

module.exports = AdditionalFileOperation;