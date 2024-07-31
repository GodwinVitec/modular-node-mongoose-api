const BaseValidator = require("../../../../BaseValidator");

class AddTankRequest extends BaseValidator {
  rules() {
    return {
      name: 'required|string',
      category: 'required|string',
      width: 'required|numeric',
      height: 'required|numeric',
      length: 'required|numeric',
      shootingRange: 'required|numeric'
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


module.exports = AddTankRequest;