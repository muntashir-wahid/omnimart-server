exports.getAllUsers = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working on getting all users",
  });
};

exports.getUser = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working on getting single user",
  });
};

exports.createUser = async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "Working on creating user",
  });
};

exports.updateUser = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working on updateing user",
  });
};

exports.deleteUser = async (req, res) => {
  res.status(204);
};
