module.exports = (err, _, res, __) => {
  const message = err.message || "Something went wrong!";
  const status = err.status || "error";
  const statusCode = err.statusCode || 500;

  console.log(err);

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
