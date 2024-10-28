const bcrypt = require("bcryptjs");

const prisma = require("../../../../database/client");
const { Status, UserRoles } = require("@prisma/client");

const catchAsync = require("../../../utils/catchAsync");

exports.encryptPassword = catchAsync(async (req, res, next) => {
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
    return next(new Error("Please Provide email and password"));
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
      AND: {
        userStatus: Status.ACTIVE,
      },
    },
  });

  if (!user) {
    return next(new Error("User doesn't exist!"));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new Error("Credentials is not correct!"));
  }

  req.authenticatedUser = {
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userRole: user.userRole,
    phone: user.phone,
  };

  next();
});
