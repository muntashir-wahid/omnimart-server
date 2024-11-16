const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllAddresses = catchAsync(async (req, res) => {
  const {
    user: { uid: userUid },
  } = req;

  const addresses = await prisma.userAddresses.findMany({
    where: {
      userUid,
    },
    select: {
      uid: true,
      label: true,
      isDefault: true,
      address: {
        select: {
          addressLine: true,
          district: {
            select: {
              name: true,
            },
          },
          division: {
            select: {
              name: true,
            },
          },
          dhakaCity: {
            select: {
              name: true,
            },
          },
          upazila: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      addresses,
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
  const {
    body: { label, addressLine, divisionId, districtId, areaId },
    user: { uid: userUid },
  } = req;

  const newAddress = await prisma.$transaction(async function (
    transactionClient
  ) {
    const upazialOrCityId =
      +districtId === 1 && +areaId < 142
        ? { dhakaCityId: +areaId }
        : { upazilaId: +areaId };

    const address = await transactionClient.addresses.create({
      data: {
        divisionId: +divisionId,
        districtId: +districtId,
        addressLine,
        ...upazialOrCityId,
      },
    });

    await transactionClient.userAddresses.create({
      data: {
        userUid,
        addressUid: address.uid,
        label,
      },
    });

    return address;
  });

  res.status(201).json({
    status: "success",
    data: {
      address: newAddress,
    },
  });
});
