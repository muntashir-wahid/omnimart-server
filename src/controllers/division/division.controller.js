const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllDivisions = catchAsync(async (req, res) => {
  const { search } = req.query;

  const divisions = await prisma.divisions.findMany({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      name: {
        contains: search,
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      divisions,
    },
  });
});

exports.getDivision = catchAsync(async (req, res) => {
  const { divisionUid } = req.params;

  const division = await prisma.divisions.findFirst({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      id: +divisionUid,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      division,
    },
  });
});
