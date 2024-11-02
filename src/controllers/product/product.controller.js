const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const { category } = req.query;
  const products = await prisma.baseProducts.findMany({
    where: {
      category: {
        slug: category,
      },
      productStatus: "ACTIVE",
    },

    select: {
      uid: true,
      name: true,
      slug: true,
      basePrice: true,
      about: true,
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
      products,
    },
  });
});

exports.getProductDetails = catchAsync(async (req, res) => {
  const { productSlug } = req.params;
  const { item, sku } = req.query;

  let product;

  if (item) {
    product = await prisma.productItems.findMany({
      where: {
        baseProduct: {
          slug: productSlug,
        },
        AND: {
          uid: {
            not: item.not,
          },
        },
      },

      select: {
        uid: true,
        baseProduct: {
          select: {
            name: true,
            slug: true,
          },
        },
        price: true,
        sku: true,
        discount: true,
        ProductConfigs: {
          select: {
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
      },
    });
  } else {
    product = await prisma.$transaction(async (transactionClient) => {
      const product = await transactionClient.baseProducts.findFirst({
        where: {
          slug: productSlug,
        },
        select: {
          uid: true,
          slug: true,
          name: true,
          about: true,
          basePrice: true,
          about: true,
          category: {
            select: {
              name: true,
              slug: true,
              uid: true,
            },
          },
        },
      });

      const item = await transactionClient.productConfigs.findFirst({
        where: {
          productItem: {
            baseProduct: {
              slug: productSlug,
            },
            ...(sku && { sku }),
          },
        },
        select: {
          productItem: {
            select: {
              uid: true,
              price: true,
              stock: true,
              sku: true,
              discount: true,
            },
          },
        },
      });

      const attributes = await transactionClient.productConfigs.findMany({
        where: {
          productItemUid: item.productItem.uid,
        },

        select: {
          attributeValue: {
            select: {
              name: true,
              uid: true,
              attributeUid: {
                select: {
                  name: true,
                  uid: true,
                },
              },
            },
          },
        },
      });

      return {
        ...product,
        ...item,
        attributes,
      };
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
