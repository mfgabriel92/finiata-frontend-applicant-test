"use strict";

const { trait, test } = use("Test/Suite")("Invoice");

trait('Test/ApiClient');

test("upload invoice", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices")
    .field("id", 500)
    .attach("invoice", "public/invoices/test/test_file_name.pdf")
    .end();

  request.assertStatus(200);
});

test("fetch invoices", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices").end();

  request.assertStatus(200);
  request.assertJSONSubset([{
    id: 1,
    originalName: "test_file_name.pdf"
  }])
});

test("delete invoice", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/100").end();

  request.assertStatus(200);
});

test("fails to delete non existent invoice", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/999").end();

  request.assertStatus(404);
  request.assertJSON({
    code: 404,
    message: "Invoice not found"
  })
});