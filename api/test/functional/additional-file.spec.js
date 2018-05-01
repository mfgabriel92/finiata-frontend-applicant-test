"use strict";

const { trait, test } = use("Test/Suite")("Additional File");
const moment = use("moment");

trait("Test/ApiClient");

test("fetch additional filesList", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices/1/additional-files").end();

  request.assertStatus(200);
  request.assertJSONSubset([
    {
      id: 1,
      invoice_id: 1,
      filename: "2018_01_01_test_file_name.pdf",
      originalName: "test_file_name.pdf",
      path: "some/path/for/file/test_file_name.pdf",
      description: "Lorem ipsum dolor sit amet"
    },
    {
      id: 2,
      invoice_id: 1,
      filename: "2018_01_01_test_file_name.pdf",
      originalName: "test_file_name.pdf",
      path: "some/path/for/file/test_file_name.pdf",
      description: "Lorem ipsum dolor sit amet"
    },
    {
      id: 3,
      invoice_id: 1,
      filename: "2018_01_01_test_file_name.pdf",
      originalName: "test_file_name.pdf",
      path: "some/path/for/file/test_file_name.pdf",
      description: "Lorem ipsum dolor sit amet"
    }
  ]);
});

test("add a new additional file", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:4000/api/v1/invoices/1/additional-files")
    .attach("additionalFile", "public/invoices/test/test_file_name.pdf")
    .end();

  request.assertStatus(200);
  request.assertJSONSubset({
    originalName: "test_file_name.pdf"
  });
});

test("fetch from non existent invoice", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices/999/additional-files").end();

  request.assertStatus(404);
  request.assertJSONSubset({
    code: 404,
    message: "Invoice not found"
  });
});

test("delete an added additional file", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/1/additional-files/1").end();

  request.assertStatus(200);
});

test("fail to delete additional file with non existent invoice file", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/999/additional-files/1").end();

  request.assertStatus(404);
  request.assertJSON({
    code: 404,
    message: "Invoice not found"
  })
});

test("fail to delete additional file with non existent additional file", async ({ client }) => {
  const request = await client.delete("http://127.0.0.1:4000/api/v1/invoices/1/additional-files/999").end();

  request.assertStatus(404);
  request.assertJSON({
    code: 404,
    message: "Additional file not found"
  })
});