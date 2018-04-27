"use strict";

const Schema = use("Schema");

class InvoiceInfoSchema extends Schema {
  up () {
    this.create("invoice_info", (table) => {
      table.increments();
      table.integer("invoice_id").notNullable().unsigned();
      table.string("invoiceAmount").notNullable();
      table.timestamp("paymentTarget").notNullable();
      table.timestamps();

      table.foreign("invoice_id").references("id").inTable("invoices").onDelete("CASCADE");
    })
  }

  down () {
    this.drop("invoice_info")
  }
}

module.exports = InvoiceInfoSchema;
