const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Working on it",
    },
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Working on it",
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      message: "Working on it",
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
