class BaseService {
  success(status, message, data=null) {
    return {
      status,
      message,
      data
    };
  }

  error(status, errors = [], trace= null) {
    return {
      status,
      errors,
      trace
    };
  }
}

module.exports = BaseService;