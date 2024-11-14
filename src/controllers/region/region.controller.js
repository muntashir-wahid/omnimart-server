const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllRegions = catchAsync(async (req, res) => {
  const { districtUid } = req.params;

  const regions = await prisma.upazilas.findMany({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      district_id: +districtUid,
    },
  });

  const moreRegions = await prisma.dhakaCity.findMany({
    select: {
      id: true,
      name: true,
      bn_name: true,
    },

    where: {
      district_id: +districtUid,
    },
  });

  const allRegions = [...regions, ...moreRegions];

  res.status(200).json({
    status: "success",
    data: {
      regions: allRegions,
    },
  });
});

// exports.getDistrict = catchAsync(async (req, res) => {
//   const { districtUid } = req.params;

//   const district = await prisma.districts.findFirst({
//     select: {
//       id: true,
//       name: true,
//       bn_name: true,
//     },

//     where: {
//       id: +districtUid,
//     },
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       district,
//     },
//   });
// });
