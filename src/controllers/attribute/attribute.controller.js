const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllAttributes = catchAsync(async (req, res) => {
  const { categoryUid } = req.params;

  const attributes = await prisma.productAttributes.findMany({
    where: {
      attributeStatus: {
        not: "DELETED",
      },
      productCategoriesUid: categoryUid,
    },
    select: {
      uid: true,
      name: true,
      attributeStatus: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      attributes,
    },
  });
});

exports.getAttribute = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      attribute: "Working on it",
    },
  });
});

exports.createAttribute = catchAsync(async (req, res) => {
  const { name, productCategoriesUid } = req.body;

  const attribute = await prisma.productAttributes.create({
    data: {
      name,
      productCategoriesUid,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      attribute,
    },
  });
});
