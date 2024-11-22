const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllCustomers = catchAsync(async (req, res) => {
  const { search, status } = req.query;

  const queryObj = {
    ...(search && {
      OR: [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
      ],
    }),

    ...(status && { userStatus: status }),
  };

  const customers = await prisma.users.findMany({
    where: {
      NOT: {
        userStatus: "DELETED",
      },
      userRole: "USER",
      ...queryObj,
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
