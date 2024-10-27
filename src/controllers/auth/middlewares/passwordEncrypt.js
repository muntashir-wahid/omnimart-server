const bcrypt = require("bcryptjs");

const catchAsync = require("../../../utils/catchAsync");
const { UserRoles, Status } = require("@prisma/client");

exports.encryptPassword = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const userDoc = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
  };

  req.newUser = { ...userDoc };
  next();
});
