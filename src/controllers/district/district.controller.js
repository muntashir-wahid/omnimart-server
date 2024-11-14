const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllDistricts = catchAsync(async (req, res) => {
  const { divisionUid } = req.params;

  const districts = await prisma.districts.findMany({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      division_id: +divisionUid,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      districts,
    },
  });
});

exports.getDistrict = catchAsync(async (req, res) => {
  const { districtUid } = req.params;

  const district = await prisma.districts.findFirst({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      id: +districtUid,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      district,
    },
  });
});
