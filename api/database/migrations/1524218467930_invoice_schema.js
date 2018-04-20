'use strict';

const Schema = use('Schema');

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.increments();
      table.string("filename");
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema;
