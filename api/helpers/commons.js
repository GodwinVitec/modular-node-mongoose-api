class Commons {
  /**
   * Check if a value is empty. A parameter with values like undefined, null,
   * "", 0, false, [], {} are considered empty.
   * @param value
   * @returns {boolean}
   */
  empty(value) {
    return value === undefined ||
      value === null ||
      value === "" ||
      value === 0 ||
      value === false ||
      (Array.isArray(value) && !value.length) ||
      (Object.prototype.isPrototypeOf(value) && !Object.keys(value).length);
  }

  /**
   * Get the fields of the request body that have been validated
   * @param request
   * @param validator
   * @return {Object}
   */
  validated = (request, validator) => {
    const _validated = {};

    for (const key of Object.keys(validator.rules())) {
      if(this.empty(request.body[key])) {
        continue;
      }

      _validated[key] = request.body[key];
    }

    return _validated;
  }
}

module.exports = Commons;