"use strict";

const Operation = use("App/Operations/Operation");
const HTTP = use("App/HTTPResponse");
const Invoice = use("App/Models/Invoice");
const Recipient = use("App/Models/Recipient");

/**
 * Operations for recipients table
 *
 * @author gabriel
 * @class
 */
class RecipientOperation extends Operation {
  /**
   * Initial values
   */
  constructor() {
    super();

    this.invoiceId = null;
    this.name = null;
    this.surname = null;
    this.address = null;
    this.phone = null;
  }

  /**
   * Operation for storing into the database
   *
   * @returns {Promise<*>}
   */
  async store() {
    const rules = {
      invoiceId: "required",
      name: "required|string",
      surname: "required|string",
      address: "required",
      phone: "required|string"
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const invoice = await Invoice.find(this.invoiceId);

    if (!invoice) {
      await this.addError(HTTP.STATUS_NOT_FOUND, "Invoice not found");
      return false;
    }

    try {
      return await Recipient.create({
        invoice_id: invoice.id,
        name: this.name,
        surname: this.surname,
        address: this.address,
        phone: this.phone,
      });
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }

  /**
   * Operation for fetching recipients from database
   *
   * @returns {Promise<void>}
   */
async fetch() {
  const rules = {
    invoiceId: "required",
  };

  if (!await this.validate(rules)) {
    return false;
  }

  return await Recipient.findBy("invoice_id", this.invoiceId);
}
}

module.exports = RecipientOperation;