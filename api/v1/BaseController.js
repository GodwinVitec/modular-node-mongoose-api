class BaseController {
  success(res, message, data = null) {
    res.send({
      status: true,
      message,
      data
    });
  }

  fail(res, message, trace = null) {
    res.send({
      status: false,
      error: message,
      trace
    });
  }
}

module.exports = BaseController;