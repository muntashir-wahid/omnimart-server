const prisma = require("../../../database/client");
const catchAsync = require("../../utils/catchAsync");

const { uploadToCloudinary } = require("../../utils/handleFile");

exports.getAllInventory = catchAsync(async (req, res) => {
  const { search, category, sort } = req.query;

  const queryObj = {
    ...(search && { name: { contains: search } }),
    ...(category && { category: { slug: category } }),
  };

  const inventory = await prisma.baseProducts.findMany({
    where: {
      NOT: {
        productStatus: "DELETED",
      },
      ...queryObj,
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

    orderBy: {
      ...(sort && sort.startsWith("-")
        ? { basePrice: "desc" }
        : { basePrice: "asc" }),
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
      ProductImages: {
        include: {
          image: {
            select: {
              fileUrl: true,
            },
          },
        },
      },

      ProductItems: {
        select: {
          ProductImages: {
            select: {
              image: {
                select: {
                  fileUrl: true,
                },
              },
            },
          },
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
  const { name, slug, basePrice, categoryUid, about } = req.body;

  const file = req.file;
  const fileType = file.mimetype.split("/").pop();
  const cloudinaryResponse = await uploadToCloudinary(file, {
    format: fileType,
  });

  const inventory = await prisma.$transaction(async function (
    transactionClient
  ) {
    const baseProduct = await transactionClient.baseProducts.create({
      data: { name, slug, basePrice, categoryUid, about },
    });

    const mediaFile = await transactionClient.mediaRoom.create({
      data: {
        fileUrl: cloudinaryResponse.secure_url,
      },
    });

    await transactionClient.productImages.create({
      data: {
        baseProductUid: baseProduct.uid,
        imageUid: mediaFile.uid,
      },
    });

    return baseProduct;
  });

  res.status(201).json({
    status: "success",
    data: {
      inventory,
    },
  });
});

exports.createInventoryStock = catchAsync(async (req, res) => {
  const { productUid } = req.params;
  const { price, stock, sku, discount, attributes } = req.body;

  const file = req.file;
  const fileType = file.mimetype.split("/").pop();
  const cloudinaryResponse = await uploadToCloudinary(file, {
    format: fileType,
  });

  const productItem = {
    baseProductUid: productUid,
    stock: +stock,
    price: +price,
    sku,
    discount: +discount,
  };

  const productStock = await prisma.$transaction(async (transactionClient) => {
    const mediaFile = await transactionClient.mediaRoom.create({
      data: {
        fileUrl: cloudinaryResponse.secure_url,
      },
    });

    const item = await transactionClient.productItems.create({
      data: productItem,
    });

    await transactionClient.productImages.create({
      data: {
        productItemUid: item.uid,
        imageUid: mediaFile.uid,
      },
    });

    await transactionClient.productConfigs.createMany({
      data: attributes.map((attribute) => ({
        productItemUid: item.uid,
        attributeValueUid: attribute,
      })),
    });

    return item;
  });

  res.status(201).json({
    status: "success",
    data: {
      productStock,
    },
  });
});

exports.getInventoryAllStocks = catchAsync(async (req, res) => {
  const { productUid } = req.params;
  const { search } = req.query;
  const queryObj = {
    ...(search && { sku: { contains: search } }),
  };

  const stocks = await prisma.productItems.findMany({
    where: {
      baseProductUid: productUid,
      ...queryObj,
    },
    select: {
      uid: true,
      price: true,
      discount: true,
      sku: true,
      stock: true,
      ProductConfigs: {
        select: {
          uid: true,
          attributeValue: {
            select: {
              name: true,
              attributeUid: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      ProductImages: {
        select: {
          image: {
            select: {
              fileUrl: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      stocks,
    },
  });
});

exports.updateInventoryStock = catchAsync(async (req, res) => {
  const { sku } = req.params;

  const stock = await prisma.productItems.update({
    where: {
      sku,
    },
    data: req.body,
  });

  res.status(200).json({
    status: "success",
    data: {
      stock,
    },
  });
});
