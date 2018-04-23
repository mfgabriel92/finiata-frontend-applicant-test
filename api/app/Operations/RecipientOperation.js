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
   * Rules for recipients table
   */
  get rules() {
    return {
      invoiceId: "required",
      name: "required|string",
      surname: "required|string",
      address: "required",
      phone: "required|string"
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
}

module.exports = RecipientOperation;