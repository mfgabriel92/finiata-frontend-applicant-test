"use strict";

const Schema = use("Schema");

class AdditionalFileSchema extends Schema {
  up () {
    this.create("additional_files", (table) => {
      table.increments();
      table.integer("invoice_id").notNullable().unsigned();
      table.string("filename").notNullable();
      table.string("originalName").notNullable();
      table.string("path").notNullable();
      table.text("description");
      table.timestamps();

      table.foreign("invoice_id").references("id").inTable("invoices").onDelete("CASCADE");
    })
  }

  down () {
    this.drop("additional_files")
  }
}

module.exports = AdditionalFileSchema;
