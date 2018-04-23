"use strict";

const RecipientOperation = use("App/Operations/RecipientOperation");

class RecipientController {
  async store({ request, response }) {
    const op = new RecipientOperation();
    op.invoiceId = request.input("invoiceId");
    op.name = request.input("name");
    op.surname = request.input("surname");
    op.address = request.input("address");
    op.phone = request.input("phone");

    const recipient = await op.store();

    if (!recipient) {
      const error = op.getFirstError();
      return response.status(error.code).send(error.message);
    }

    return response.status(200).send(recipient);
  }
}

module.exports = RecipientController;
