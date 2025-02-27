class ErroHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  if (err.name === "CastError") {
    const message = `invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `json webtoken is invalid try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired`;
    err = new ErrorHandler(message, 400);
  }
  return res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
    err: err,
  });
};
