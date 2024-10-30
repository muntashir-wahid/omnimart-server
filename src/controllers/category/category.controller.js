const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await prisma.productCategories.findMany({
    where: {
      categoryStatus: {
        not: "DELETED",
      },
    },
    select: {
      uid: true,
      slug: true,
      name: true,
      description: true,
      categoryStatus: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  const { categorySlug } = req.params;

  const category = await prisma.productCategories.findFirst({
    where: {
      slug: categorySlug,
    },
    select: {
      uid: true,
      slug: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      categoryStatus: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const category = await prisma.productCategories.create({
    data: req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Working on it",
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
});
