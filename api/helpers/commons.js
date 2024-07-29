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
}

module.exports = Commons;