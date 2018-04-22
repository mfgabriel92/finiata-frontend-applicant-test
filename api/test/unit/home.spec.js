'use strict';

const { trait, test } = use('Test/Suite')('Home');
const InvoiceOperation = use("App/Operations/InvoiceOperation");

trait("Test/ApiClient");

test("Homepage returns status code 200", async ({ client }) => {
  const response = await client.get("http://localhost:3000/").end();
  response.assertStatus(200);
});

test("Insert a new data into invoices table", async ({ client }) => {
  await client
    .post("http://localhost:3000/invoice")
    .attach('invoice', "/home/gabriel/Downloads/ZendFramework2_Fundamentals_Certification.pdf")
    .end()
});
