const jwt = require("jsonwebtoken");

const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

const signToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Working on login",
  });
});

exports.register = catchAsync(async (req, res) => {
  const user = await prisma.users.create({
    data: req.newUser,
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      userRole: true,
      phone: true,
    },
  });

  const token = signToken({
    uid: user.uid,
    userRole: user.userRole,
  });

  res.cookie("ACCESS_TOKEN", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
