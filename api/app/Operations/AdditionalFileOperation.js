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

    this.id = null;
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

    await file.move(path, { name });

    if (!file.moved()) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, file.error());
      return false;
    }

    try {
      return await AdditionalFile.create({
        invoice_id: this.invoiceId,
        filename: name,
        originalName: file.clientName,
        path: path.substr(7) + "/" + name,
        description: this.description
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }

  /**
   * Deletes an existing additional file from the database
   *
   * @returns {Promise<void>}
   */
  async destroy() {
    const rules = {
      invoiceId: "required",
      id: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    const additionalFile = await AdditionalFile.find(this.id);

    if (!additionalFile) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Additional file not found");
      return false;
    }

    return await additionalFile.delete();
  }

  /**
   * Download an additional file
   *
   * @returns {Promise<*>}
   */
  async download() {
    const rules = {
      invoiceId: "required",
      id: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    const additionalFile = await AdditionalFile.find(this.id);

    if (!additionalFile) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Additional file not found");
      return false;
    }

    return additionalFile;
  }
}

module.exports = AdditionalFileOperation;