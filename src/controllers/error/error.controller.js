module.exports = (err, _, res, __) => {
  let message = err.message || "Something went wrong!";
  let status = err.status || "error";
  let statusCode = err.statusCode || 500;

  console.log(err);

  // Unique Constraint Error
  if (err.code === "P2002") {
    const duplicateField = err.meta.target.split("_")[1];

    status = "fail";
    statusCode = 400;
    message = `Duplicate filed ${duplicateField}.`;
  }

  // Unique Constraint Error
  if (err.code === "P2003") {
    const duplicateField = err.meta.field_name;

    status = "fail";
    statusCode = 400;
    message = `Invalid Data ${duplicateField}.`;
  }

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
