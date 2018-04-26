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
  async run() {
    await Invoice.createMany([
      {
        id: 1,
        filename: "2018_01_01_test_file_name.pdf",
        originalName: "test_file_name.pdf",
        path: "some/path/to/file/test_file_name.pdf"
      },
      {
        id: 50,
        filename: "2018_01_01_test_file_name.pdf",
        originalName: "test_file_name.pdf",
        path: "some/path/to/file/test_file_name.pdf"
      },
      {
        id: 100,
        filename: "2018_01_01_test_file_name.pdf",
        originalName: "test_file_name.pdf",
        path: "some/path/to/file/test_file_name.pdf"
      }
    ]);
  }
}

module.exports = InvoiceSeeder;
