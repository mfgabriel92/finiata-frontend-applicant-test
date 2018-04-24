"use strict";

const { trait, test } = use("Test/Suite")("Additional File");
const moment = use("moment");

trait("Test/ApiClient");

test("fetch additional files", async ({ client }) => {
  const request = await client.get("http://127.0.0.1:4000/api/v1/invoices/1/additional-files").end();

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
