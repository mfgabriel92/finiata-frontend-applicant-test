"use strict";

/*
|--------------------------------------------------------------------------
| 1_InvoiceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const Invoice = use("App/Models/Invoice");

class InvoiceSeeder {
  async run () {
    await Invoice.create({
      id: 1,
      filename: "test_file_name.pdf",
      path: "some/path/to/file/test_file_name.pdf"
    });
  }
}

module.exports = InvoiceSeeder;
