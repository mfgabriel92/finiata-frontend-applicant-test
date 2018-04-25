"use strict";

const { trait, test } = use("Test/Suite")("Invoice");

trait('Test/ApiClient');

test("fetch invoices", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices").end();

  request.assertStatus(200);
  // request.assertJSONSubset({
  //   id: 50,
  //   filename: "test_file_name.pdf",
  //   path: "some/path/to/file/test_file_name.pdf",
  //   invoiceInfo: [{
  //     id: 50,
  //     invoice_id: 50
  //   }],
  //   recipients: [{
  //     id: 50,
  //     invoice_id: 50
  //   }],
  //   additionalFile: [{
  //     id: 50,
  //     invoice_id: 50
  //   }]
  // })
});

test("delete invoice", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/100").end();

  request.assertStatus(200);
});

test("fails to delete non existent invoice", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/999").end();

  request.assertStatus(404);
  // request.assertJSON({
  //   code: 404,
  //   message: "Invoice not found"
  // })
});