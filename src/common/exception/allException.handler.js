const allExceptionHandler = (app) => {
  app.use((error, req, res, next) => {
    let status = error?.status ?? error?.statusCode ?? error?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    res.status(status).json({
      message: error?.message ?? error?.stack ?? "internal server error",
    });
  });
};

module.exports = { allExceptionHandler };
