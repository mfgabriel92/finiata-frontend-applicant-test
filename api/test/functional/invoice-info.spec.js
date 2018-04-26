"use strict";

const { trait, test } = use("Test/Suite")("InvoiceInfo");
const moment = use("moment");

trait('Test/ApiClient');

test("insertion of invoice info", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices-info/1")
    .header('accept', 'application/json')
    .send({
      id: 2,
      invoice_id: 1,
      invoiceAmount: 1500.00,
      paymentTarget: "2012-12-21 12:12:12"
    })
    .end();

  request.assertStatus(200);
  request.assertJSONSubset({
    id: 2,
    invoice_id: 1,
    invoiceAmount: 1500.00,
    paymentTarget: "2012-12-21 12:12:12",
  });
});

test("failure of insertion with non existent invoice ID", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices-info/999")
    .header('accept', 'application/json')
    .send({
      invoiceAmount: 123.45,
      paymentTarget: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .end();

  request.assertStatus(404);
  request.assertJSON({
    code: 404,
    message: "Invoice not found"
  })
});

test("failure of insertion with a missing field", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices-info/1")
    .header('accept', 'application/json')
    .send({
      invoiceAmount: null,
      paymentTarget: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .end();

  request.assertStatus(500);
});