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
  async run () {
    await InvoiceInfo.create({
      id: 1,
      invoice_id: 1,
      invoiceAmount: 1500.00,
      paymentTarget: moment().format("YYYY-MM-DD HH:mm:ss")
    })
  }
}

module.exports = InvoiceInfoSeeder;
