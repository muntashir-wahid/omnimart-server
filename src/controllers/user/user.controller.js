const { promisify } = require("util");
const jwt = require("jsonwebtoken");

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

exports.getMe = catchAsync(async (req, res) => {
  let token;
  // Get and check token token in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token === "undefined") {
    return res.status(200).json({
      status: "success",
      data: {
        user: null,
      },
    });
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user is currently available
  const currentUser = await prisma.users.findUnique({
    where: {
      uid: decoded.uid,
      AND: {
        userStatus: "ACTIVE",
      },
    },
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      email: true,
      userRole: true,
      phone: true,
      userStatus: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});
