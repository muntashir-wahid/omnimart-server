const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllAddresses = catchAsync(async (req, res) => {
  // const { categoryUid } = req.params;

  // const attributes = await prisma.productAttributes.findMany({
  //   where: {
  //     attributeStatus: {
  //       not: "DELETED",
  //     },
  //     productCategoriesUid: categoryUid,
  //   },
  //   select: {
  //     uid: true,
  //     name: true,
  //     attributeStatus: true,
  //   },
  // });

  res.status(200).json({
    status: "success",
    data: {
      address: "Working on it",
    },
  });
});

exports.getAddress = catchAsync(async (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    data: {
      attribute: "Working on it",
    },
  });
});

exports.createAddress = catchAsync(async (req, res) => {
  // const { name, productCategoriesUid } = req.body;
  console.log(req.body);

  // const attribute = await prisma.productAttributes.create({
  //   data: {
  //     name,
  //     productCategoriesUid,
  //   },
  // });

  res.status(201).json({
    status: "success",
    data: {
      address: "Working on it",
    },
  });
});
