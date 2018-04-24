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

    this.id = null;
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
    if (this.id) {
      return await this._update();
    }

    return await this._create();
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

  /**
   * Creates a new record
   *
   * @returns {Promise<boolean>}
   * @private
   */
  async _create() {
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
   * Updates an existing record
   *
   * @returns {Promise<void>}
   * @private
   */
  async _update() {
    const rules = {
      id: "required",
    };

    if (!await this.validate(rules)) {
      return false;
    }

    const recipient = await Recipient.find(this.id);

    if (!recipient) {
      this.addError(HTTP.STATUS_NOT_FOUND, "Recipient does not exist");
      return false;
    }

    try {
      recipient.name = this.name;
      recipient.surname = this.surname;
      recipient.address = this.address;
      recipient.phone = this.phone;

      await recipient.save();

      return recipient;
    } catch (e) {
      this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, e);
      return false;
    }
  }
}

module.exports = RecipientOperation;