"use strict";

const Schema = use("Schema");

class RecipientSchema extends Schema {
  up () {
    this.create("recipients", (table) => {
      table.increments();
      table.integer("invoice_id").notNullable().unsigned();
      table.string("name").notNullable();
      table.string("surname").notNullable();
      table.string("address").notNullable();
      table.string("phone").notNullable();
      table.timestamps();

      table.foreign("invoice_id").references("id").inTable("invoices");
    })
  }

  down () {
    this.drop("recipients")
  }
}

module.exports = RecipientSchema;
