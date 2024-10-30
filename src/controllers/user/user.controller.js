const prisma = require("../../../database/client");

const catchAsync = require("./../../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await prisma.users.findMany({
    where: {
      NOT: {
        userStatus: "DELETED",
      },
    },
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      phone: true,
      userRole: true,
      userStatus: true,
      email: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const { userUid } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      phone: true,
      userRole: true,
      userStatus: true,
      email: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const userDoc = { ...req.newUser };

  const user = await prisma.users.create({
    data: userDoc,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { userUid } = req.params;
  const user = await prisma.users.update({
    where: {
      uid: userUid,
    },
    data: req.body,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { userUid } = req.params;

  await prisma.users.update({
    where: {
      uid: userUid,
    },
    data: {
      userStatus: "DELETED",
    },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
