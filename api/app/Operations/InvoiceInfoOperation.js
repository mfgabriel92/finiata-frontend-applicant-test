"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const InvoiceInfo = use("App/Models/InvoiceInfo");
const moment = use("moment");

/**
 * Operations for invoice_info table
 *
 * @author gabriel
 * @class
 */
class InvoiceInfoOperation extends Operation {
  /**
   * Initial values
   */
  constructor() {
    super();

    this.id = null;
    this.invoiceId = null;
    this.invoiceAmount = null;
    this.paymentTarget = null;
  }

  /**
   * Rules for invoice_info table
   */
  get rules() {
    return {
      invoiceId: "required",
      invoiceAmount: "required",
      paymentTarget: "required"
    }
  }

  /**
   * Operation for storing into the database
   *
   * @returns {Promise<boolean>}
   */
  async store() {
    if (!this.validate()) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      await this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    await InvoiceInfo.create({
      invoice_id: invoice.id,
      invoiceAmount: this.invoiceAmount,
      paymentTarget: moment(this.paymentTarget).format("YYYY-MM-DD HH:mm:ss")
    });
  }
}

module.exports = InvoiceInfoOperation;