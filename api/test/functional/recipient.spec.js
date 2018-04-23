"use strict";

const { trait, test } = use("Test/Suite")("Add Recipient");

trait("Test/ApiClient");

test("insertion of a recipient", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/recipients")
    .header('accept', 'application/json')
    .send({
      invoiceId: 1,
      name: "John",
      surname: "Doe",
      address: "123 Lorem Ipsum, DO",
      phone: "555555555"
    })
    .end();

  request.assertStatus(200);
});