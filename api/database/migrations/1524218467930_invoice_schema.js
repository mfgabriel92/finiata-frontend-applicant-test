'use strict';

const Schema = use('Schema');

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.increments();
      table.string("filename").notNullable();
      table.string("originalName").notNullable();
      table.string("path").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema;
