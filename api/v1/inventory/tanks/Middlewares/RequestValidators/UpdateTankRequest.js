const BaseValidator = require("../../../../BaseValidator");

class AddTankRequest extends BaseValidator {
  rules() {
    return {
      name: 'sometimes|string',
      category: 'sometimes|string',
      width: 'sometimes|numeric',
      height: 'sometimes|numeric',
      length: 'sometimes|numeric',
      shootingRange: 'sometimes|numeric'
    };
  }

  customMessages() {
    return {
      required: ':attribute is required',
      string: ':attribute must be a string',
      numeric: ':attribute must be a number'
    };
  }
}


module.exports = (new AddTankRequest()).validate;