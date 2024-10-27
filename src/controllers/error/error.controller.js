module.exports = (err, _, res, __) => {
  console.log(err);
  res.status(500).json({
    status: "error",
    error: err.message,
  });
};
