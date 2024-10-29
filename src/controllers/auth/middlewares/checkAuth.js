const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const prisma = require("./../../../../database/client");
const catchAsync = require("../../../utils/catchAsync");
const { Status } = require("@prisma/client");

exports.protect = catchAsync(async (req, _, next) => {
  let token;
  // Get and check token token in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token === "undefined") {
    return next(
      new Error("You are not logged in. Please login to get the access")
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user is currently available
  const currentUser = await prisma.users.findUnique({
    where: {
      uid: decoded.uid,
      AND: {
        NOT: {
          userStatus: Status.DELETED,
        },
      },
    },
  });

  if (!currentUser) {
    return next(
      new AppError("The user belonging to token does no longer exit", 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new Error("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
