module.exports = (err, _, res, __) => {
  let message = err.message || "Something went wrong!";
  let status = err.status || "error";
  let statusCode = err.statusCode || 500;

  // Unique Constraint Error
  if (err.code === "P2002") {
    const duplicateField = err.meta.target.split("_")[1];

    status = "fail";
    statusCode = 400;
    message = `Duplicate filed ${duplicateField}.`;
  }

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
