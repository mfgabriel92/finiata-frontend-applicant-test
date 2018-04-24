"use strict";

const { trait, test } = use("Test/Suite")("Additional File");
const moment = use("moment");

trait("Test/ApiClient");

test("fetch additional filesList", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices/1/additional-filesList").end();

  request.assertStatus(200);
  request.assertJSONSubset([
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
      id: 2,
      invoice_id: 1,
      filename: "test_file_name.pdf",
      path: "some/path/for/file/test_file_name.pdf",
      description: "Lorem ipsum dolor sit amet"
    }
  ]);
});

test("add a new additional file", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices/1/additional-filesList")
    .send({
      id: 4,
      invoice_id: 1,
      filename: "a_new_file_uploaded.png",
      path: "some/new/path/to/a_new_file_uploaded.png",
      description: "Lorem ipsum dolor sit amet"
    })
    .end();

  request.assertStatus(200);
  request.assertJSONSubset({
    id: 4,
    invoice_id: 1,
    filename: "a_new_file_uploaded.png",
    path: "some/new/path/to/a_new_file_uploaded.png",
    description: "Lorem ipsum dolor sit amet"
  });
});

test("fetch from non existent invoice", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices/999/additional-filesList").end();

  request.assertStatus(404);
  request.assertJSONSubset({
    code: 404,
    message: "Invoice not found"
  });
});
