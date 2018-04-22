"use strict";

const { test } = use("Test/Suite")("InvoiceInfo");
const InvoiceInfoOperation = use("App/Operations/InvoiceInfoOperation");
const moment = use("moment");

test("insertion of invoice info", async ({ client }) => {
  const op = new InvoiceInfoOperation();

  op.invoiceId = 1;
  op.invoiceAmount = 123.45;
  op.paymentTarget = moment().format("YYYY-MM-DD HH:mm:ss");

  await op.store();
});