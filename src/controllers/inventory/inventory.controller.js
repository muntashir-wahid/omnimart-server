const prisma = require("../../../database/client");
const catchAsync = require("../../utils/catchAsync");

exports.getAllInventory = catchAsync(async (req, res) => {
  const inventory = await prisma.baseProducts.findMany({
    where: {
      NOT: {
        productStatus: "DELETED",
      },
    },
    select: {
      uid: true,
      name: true,
      basePrice: true,
      slug: true,
      productStatus: true,
      category: {
        select: {
          uid: true,
          slug: true,
          name: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      inventory,
    },
  });
});

exports.getInventory = catchAsync(async (req, res) => {
  const { inventorySlug } = req.params;

  const inventory = await prisma.baseProducts.findFirst({
    where: {
      slug: inventorySlug,
      AND: {
        NOT: {
          productStatus: "DELETED",
        },
      },
    },
    include: {
      category: {
        select: {
          name: true,
          uid: true,
          slug: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      inventory,
    },
  });
});

exports.createInventory = catchAsync(async (req, res) => {
  const inventory = await prisma.baseProducts.create({
    data: req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      inventory,
    },
  });
});
