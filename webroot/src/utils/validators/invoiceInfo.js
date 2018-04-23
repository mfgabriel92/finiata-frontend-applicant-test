import validator from "validator";
import moment from "moment";

export default function validate(data) {
  let errors = {};

  if (validator.isEmpty(data.invoiceAmount)) {
    errors.invoiceAmount = "Invoice amount is required";
  }

  if (data.invoiceAmount < 0) {
    errors.invoiceAmount = "Invoice amount must be above 0";
  }

  if (moment(data.paymentTarget).diff(moment(), "days") < 0) {
    errors.paymentTarget = "Payment target mustn't be before today";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}