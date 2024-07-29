const Validator = require("validatorjs");

class BaseValidator {
  validator(body, rules, customMessages, callback) {
    const validation = new Validator(body, rules, customMessages);
    let status = true;
    let errors = null;

    validation.fails(() => {
      status = false;
      errors = validation.errors
    });

    callback(errors, status);
  }

  validationError(res, err) {
    return res.status(412)
      .send({
        status: false,
        message: 'Validation failed',
        error: err.errors
      });
  }

  rules() {
    throw new Error('You have to implement the rules method!');
  }

  customMessages() {
    throw new Error('You have to implement the customMessages method!');
  }

  validate = (req, res, next) => {
    this.validator(
      req.body,
      this.rules(),
      this.customMessages(),
      (err, status) => {
        if (!status) {
          return this.validationError(res, err);
        } else {
          return next();
        }
      }
    )
  };
}


module.exports = BaseValidator;