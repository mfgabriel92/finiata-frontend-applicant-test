"use strict";

const { trait, test } = use("Test/Suite")("InvoiceInfo");
const moment = use("moment");

trait('Test/ApiClient');

test("insertion of invoice info", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/invoices-info")
    .header('accept', 'application/json')
    .send({
      invoiceId: 1,
      invoiceAmount: 123.45,
      paymentTarget: moment().format('2018-01-01 12:12:12')
    })
    .end();

  request.assertStatus(200);
  request.assertJSONSubset({
    invoice_id: 1,
    invoiceAmount: 123.45,
    paymentTarget: "2018-01-01 12:12:12",
  });
});

test("failure of insertion with non existent invoice ID", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/invoices-info")
    .header('accept', 'application/json')
    .send({
      invoiceId: 999,
      invoiceAmount: 123.45,
      paymentTarget: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .end();

  request.assertStatus(404);
});

test("failure of insertion with a missing field", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/invoices-info")
    .header('accept', 'application/json')
    .send({
      invoiceId: 1,
      invoiceAmount: null,
      paymentTarget: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .end();

  request.assertStatus(500);
});