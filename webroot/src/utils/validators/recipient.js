import validator from "validator";

export default function validate(data) {
  let errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (validator.isEmpty(data.surname)) {
    errors.surname = "Invoice amount is required";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Invoice amount is required";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Invoice amount is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}