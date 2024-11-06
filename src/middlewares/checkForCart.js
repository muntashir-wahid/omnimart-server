const prisma = require("../../database/client");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.checkStockAndUser = catchAsync(async (req, res, next) => {
  // Get the user
  const { uid: userUid } = req.user;
  const { productUid } = req.body;

  // Check if the product has enough stock
  const hasStock = await prisma.productItems.findUnique({
    where: {
      uid: productUid,
      stock: {
        gt: 0,
      },
    },
  });

  if (!hasStock) {
    return next(new AppError("Insufficient Stock", 400));
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userUid,
    },
  });

  req.cart = cart;

  next();
});
