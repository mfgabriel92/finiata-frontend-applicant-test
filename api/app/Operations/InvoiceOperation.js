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

    this.invoice = null;
  }

  /**
   * Rules for invoices table
   */
  get rules() {
    return {
      invoice: "required"
    }
  }

  /**
   * Operation for storing into the database
   *
   * @returns {Promise<*>}
   */
  async store() {
    if (!await this.validate()) {
      return false;
    }

    const file = this.invoice;
    const name = moment().format("YYYY-MM-DD-HH-mm-ss") + "_" + file.clientName;

    await file.move(Invoice.directoryPath(), {
      name
    });

    if (!file.moved()) {
      return file.error();
    }

    try {
      await Invoice.create({
        filename: name
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }

    return true;
  }
}

module.exports = InvoiceOperation;