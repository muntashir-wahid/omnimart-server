const { UserRoles } = require("@prisma/client");

const prisma = require("../../../database/client");

exports.getAllUsers = async (req, res) => {
  const users = await prisma.users.findMany({});

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

exports.getUser = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working on getting single user",
  });
};

exports.createUser = async (req, res) => {
  const userDoc = { ...req.body };
  userDoc.userRole = UserRoles.USER;

  const user = await prisma.users.create({
    data: userDoc,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
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
