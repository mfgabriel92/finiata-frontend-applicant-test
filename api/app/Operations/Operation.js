"use strict";

const Validator = use('Validator');
const HTTP = use("App/HTTPResponse");

/**
 * Class model for basic operations
 *
 * @author gabriel
 * @class
 */
class Operation {
  constructor() {
    this.errors = [];
    this.validator = Validator
  }

  /**
   * Common rules
   *
   * @returns {{}}
   */
  get rules() {
    return {}
  }

  /**
   * Validation of data being sent to the database
   *
   * @param rules
   * @returns {Promise<boolean>}
   */
  async validate(rules) {
    this.errors = [];

    const validation = await this.validator.validate(this, rules);

    if (validation.fails()) {
      validation.messages().map((err) => {
        this.addError(HTTP.STATUS_INTERNAL_SERVER_ERROR, err.message);
      });

      return false;
    }

    return true;
  }

  /**
   * Function for adding an error message to the array of errors
   *
   * @param code
   * @param message
   * @returns {Promise<void>}
   */
  async addError(code, message) {
    await this.errors.push({ code, message })
  }

  /**
   * Gets the first error on the errors list
   *
   * @returns {Promise<*>}
   */
  getFirstError() {
    return this.errors[0]
  }
}


module.exports = Operation;