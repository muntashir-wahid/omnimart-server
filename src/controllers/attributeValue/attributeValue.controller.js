const prisma = require("../../../database/client");
const catchAsync = require("../../utils/catchAsync");

exports.getAttributeValues = catchAsync(async (req, res) => {
  const { attributeUid } = req.params;

  const values = await prisma.attributeValues.findMany({
    where: {
      valueStatus: {
        not: "DELETED",
      },
      productAttributesUid: attributeUid,
    },
    include: {
      attributeUid: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      values,
    },
  });
});

exports.createAttributeValues = catchAsync(async (req, res) => {
  const { attributeUid } = req.params;
  const { name } = req.body;

  const value = await prisma.attributeValues.create({
    data: {
      name,
      productAttributesUid: attributeUid,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      value,
    },
  });
});
