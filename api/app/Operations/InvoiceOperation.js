"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const moment = use("moment");

/**
 * Operations for invoices table
 *
 * @author gabriel
 * @class
 */
class InvoiceOperation extends Operation {
  /**
   * Initial values
   */
  constructor() {
    super();

    this.id = null;
    this.invoice = null;
  }

  /**
   * Operation for fetching from the database
   *
   * @returns {Promise<void>}
   */
  async fetch() {
    return await Invoice.query()
      .with("invoiceInfo")
      .with("recipients")
      .with("additionalFiles")
      .fetch();
  }

  /**
   * Operation for storing into the database
   *
   * @returns {Promise<*>}
   */
  async store() {
    const rules = {
      invoice: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const file = this.invoice;
    const name = moment().format("YYYY-MM-DD-HH-mm-ss") + "_" + file.clientName;
    const path = Invoice.directoryPath();

    await file.move(path, {
      name
    });

    if (!file.moved()) {
      return file.error();
    }

    try {
      return await Invoice.create({
        filename: name,
        path: path + "/" + name
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }

  /**
   * Deletes an invoice from the database and everything related to it
   *
   * @returns {Promise<void>}
   */
  async destroy() {
    const rules = {
      id: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.id);

    if (!invoice) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    return await invoice.delete(this.id);
  }
}

module.exports = InvoiceOperation;