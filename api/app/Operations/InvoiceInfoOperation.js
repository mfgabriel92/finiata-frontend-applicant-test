"use strict";

const Helpers = use("Helpers");
const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const Recipient = use("App/Models/Recipient");
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
   * Operation for storing into the database
   *
   * @returns {Promise<boolean>}
   */
  async store() {
    const rules = {
      invoiceId: "required",
      invoiceAmount: "required",
      paymentTarget: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      await this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    const recipient = await Recipient.findBy("invoice_id", this.invoiceId);

    if (!recipient) {
      await this.addError(HTTP.STATUS_NOT_FOUND, "A recipient must be provided before proceeding.");
      return false;
    }

    try {
      return await InvoiceInfo.create({
        invoice_id: invoice.id,
        invoiceAmount: this.invoiceAmount,
        paymentTarget: moment(this.paymentTarget).format("YYYY-MM-DD HH:mm:ss")
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }
}

module.exports = InvoiceInfoOperation;