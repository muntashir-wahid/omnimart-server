const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllCustomers = catchAsync(async (req, res) => {
  const customers = await prisma.users.findMany({
    where: {
      NOT: {
        userStatus: "DELETED",
      },
      userRole: "USER",
    },
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      phone: true,
      userStatus: true,
      email: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      customers,
    },
  });
});

exports.getCustomer = catchAsync(async (req, res) => {
  const { customerUid } = req.params;

  const customer = await prisma.users.findUnique({
    where: {
      uid: customerUid,
      NOT: {
        userStatus: "DELETED",
      },
    },
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      phone: true,
      userStatus: true,
      email: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});
