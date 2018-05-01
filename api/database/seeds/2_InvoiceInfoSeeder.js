"use strict";

/*
|--------------------------------------------------------------------------
| InvoiceInfoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const InvoiceInfo = use("App/Models/InvoiceInfo");
const moment = use("moment");

class InvoiceInfoSeeder {
  async run() {
    await InvoiceInfo.createMany([
      {
        id: 1,
        invoice_id: 1,
        invoiceAmount: "1,500,00",
        paymentTarget: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id: 50,
        invoice_id: 50,
        invoiceAmount: "1,500,00",
        paymentTarget: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    ])
  }
}

module.exports = InvoiceInfoSeeder;
