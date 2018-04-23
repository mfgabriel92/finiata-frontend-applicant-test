"use strict";

const { trait, test } = use("Test/Suite")("Add Recipient");
const Recipient = use("App/Models/Recipient");

trait("Test/ApiClient");

test("fetching recipients", async ({ client }) => {
  await Recipient.create({
    id: 1,
    invoice_id: 1,
    name: "Test",
    surname: "Ing",
    address: "123 Lorem",
    phone: "55555555",
    created_at: "0000-00-00 00:00:00",
    updated_at: "0000-00-00 00:00:00",
  });

  const response = await client.get("http://127.0.0.1:3333/api/v1/recipients/1").end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: 2,
    invoice_id: 1,
    name: "Test",
    surname: "Ing",
    address: "123 Lorem",
    phone: "55555555",
    created_at: "0000-00-00 00:00:00",
    updated_at: "0000-00-00 00:00:00"
  });

  await Recipient.delete(1);
});

test("failure insertion with non existent invoice ID", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/recipients/999")
    .header('accept', 'application/json')
    .send({
      name: "John",
      surname: "Doe",
      address: "123 Lorem Ipsum, DO",
      phone: "555555555"
    })
    .end();

  request.assertStatus(404);
});

test("failure insertion without all fields", async ({ client }) => {
  const request = await client.post("http://127.0.0.1:3333/api/v1/recipients/1")
    .header('accept', 'application/json')
    .send({
      name: "John",
      surname: "Doe",
      address: "123 Lorem Ipsum, DO",
      phone: null
    })
    .end();

  request.assertStatus(500);
});

test("update recipient", async ({ client }) => {
  const request = client.put("http://127.0.0.1:3333/api/v1/recipients/1").end();

  request.assertStatus(200);
});