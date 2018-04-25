"use strict";

/*
|--------------------------------------------------------------------------
| 3_RecipientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const Recipient = use("App/Models/Recipient");

class RecipientSeeder {
  async run() {
    await Recipient.createMany([
      {
        id: 1,
        invoice_id: 1,
        name: "John",
        surname: "Doe",
        address: "123 Lorem Ipsum, DO",
        phone: "55555555"
      },
      {
        id: 50,
        invoice_id: 50,
        name: "John",
        surname: "Doe",
        address: "123 Lorem Ipsum, DO",
        phone: "55555555"
      }
    ])
  }
}

module.exports = RecipientSeeder;
