"use strict";

/*
|--------------------------------------------------------------------------
| 4_AdditionalFileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const AdditionalFile = use("App/Models/AdditionalFile");

class AdditionalFileSeeder {
  async run() {
    await AdditionalFile.createMany([
      {
        id: 1,
        invoice_id: 1,
        filename: "test_file_name.pdf",
        path: "some/path/for/file/test_file_name.pdf",
        description: "Lorem ipsum dolor sit amet"
      },
      {
        id: 2,
        invoice_id: 1,
        filename: "test_file_name.pdf",
        path: "some/path/for/file/test_file_name.pdf",
        description: "Lorem ipsum dolor sit amet"
      },
      {
        id: 3,
        invoice_id: 1,
        filename: "test_file_name.pdf",
        path: "some/path/for/file/test_file_name.pdf",
        description: "Lorem ipsum dolor sit amet"
      },
      {
        id: 50,
        invoice_id: 50,
        filename: "test_file_name.pdf",
        path: "some/path/for/file/test_file_name.pdf",
        description: "Lorem ipsum dolor sit amet"
      }
    ])
  }
}

module.exports = AdditionalFileSeeder;
