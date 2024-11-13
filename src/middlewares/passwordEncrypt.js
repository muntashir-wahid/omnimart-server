const bcrypt = require("bcryptjs");

const { UserRoles } = require("@prisma/client");
const catchAsync = require("../utils/catchAsync");
const prisma = require("../../database/client");
const AppError = require("../utils/appError");

exports.encryptPassword = catchAsync(async (req, _, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const userRole = req.body.userRole || UserRoles.USER;

  const userDoc = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    userRole,
  };

  req.newUser = { ...userDoc };
  next();
});

exports.checkUserCredentials = catchAsync(async (req, _, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
      AND: {
        userStatus: "ACTIVE",
      },
    },
  });

  if (!user) {
    return next(new AppError("User doesn't exist!", 400));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new AppError("Credentials is not correct!", 400));
  }

  req.authenticatedUser = {
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userRole: user.userRole,
    phone: user.phone,
    userStatus: user.userStatus,
    createdAt: user.createdAt,
  };

  next();
});
