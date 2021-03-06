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
   * Operation for storing into the database or updating an existing record
   *
   * @returns {Promise<boolean>}
   */
  async store() {
    if (this.id) {
      return await this._update();
    }

    return await this._create();
  }

  /**
   * Creates a new record
   *
   * @returns {Promise<*>}
   * @private
   */
  async _create() {
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

  /**
   * Updates an existing record
   *
   * @returns {Promise<boolean>}
   * @private
   */
  async _update() {
    const rules = {
      id: "required"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoiceInfo = await InvoiceInfo.find(this.id);

    if (!invoiceInfo) {
      await this.addError(HTTP.STATUS_NOT_FOUND, "Invoice's data not found");
      return false;
    }

    try {
      invoiceInfo.invoiceAmount = this.invoiceAmount;
      invoiceInfo.paymentTarget = moment(this.paymentTarget).format("YYYY-MM-DD HH:mm:ss");

      await invoiceInfo.save();

      return invoiceInfo;
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }
}

module.exports = InvoiceInfoOperation;