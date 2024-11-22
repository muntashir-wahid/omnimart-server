const prisma = require("../../../database/client");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res) => {
  const {
    user: { userRole, uid: userUid },
  } = req;
  const { search, status, sort } = req.query;
  const queryObj = {
    ...(search && {
      OR: [
        {
          user: {
            firstName: {
              contains: search,
            },
          },
        },
        {
          user: {
            lastName: {
              contains: search,
            },
          },
        },
      ],
    }),

    ...(status && { orderStatus: status }),
  };

  const ordersQuery = prisma.productOrders.findMany;

  let orders;

  if (userRole === "USER") {
    orders = await ordersQuery({
      where: {
        userUid,
        ...queryObj,
      },

      select: {
        uid: true,
        totalPrice: true,
        orderStatus: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (userRole === "ADMIN") {
    orders = await ordersQuery({
      where: {
        ...queryObj,
      },
      select: {
        uid: true,
        totalPrice: true,
        orderStatus: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },

      orderBy: {
        ...(sort && sort.startsWith("-")
          ? { createdAt: "asc" }
          : { createdAt: "desc" }),
      },
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res) => {
  const {
    user: { userRole, uid: userUid },
    params: { orderUid },
  } = req;

  const orderQuery = prisma.productOrders.findFirst;

  let order;

  if (userRole === "USER") {
    order = await orderQuery({
      where: {
        uid: orderUid,
      },
      select: {
        uid: true,
        totalPrice: true,
        deliveryCharge: true,
        paymentMethod: true,
        orderStatus: true,
        deliveryMethod: true,
        createdAt: true,
        updatedAt: true,
        OrderLine: {
          select: {
            uid: true,
            discount: true,
            price: true,
            qunatity: true,
            product: {
              select: {
                ProductConfigs: {
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
                },
                baseProduct: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        userAddress: {
          select: {
            uid: true,
            label: true,
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
        },
      },
    });
  }

  if (userRole === "ADMIN") {
    order = await orderQuery({
      where: {
        uid: orderUid,
      },

      select: {
        uid: true,
        totalPrice: true,
        deliveryCharge: true,
        paymentMethod: true,
        orderStatus: true,
        deliveryMethod: true,
        userUid: true,
        createdAt: true,
        updatedAt: true,
        OrderLine: {
          select: {
            uid: true,
            discount: true,
            price: true,
            qunatity: true,
            product: {
              select: {
                ProductConfigs: {
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
                },
                baseProduct: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        userAddress: {
          select: {
            uid: true,
            label: true,
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
        },
      },
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.createOrder = catchAsync(async (req, res) => {
  const {
    totalPrice,
    deliveryCharge,
    deliveryMethod,
    paymentMethod,
    userAddressUid,
  } = req.body;
  const { uid: userUid } = req.user;

  const cart = await prisma.cart.findFirst({
    where: {
      userUid,
    },

    select: {
      CartItems: {
        select: {
          product: {
            select: {
              uid: true,
              price: true,
              discount: true,
            },
          },
          quantity: true,
        },
      },
    },
  });

  const cartItems = cart.CartItems.map((item) => {
    const newCart = {
      productUid: item.product.uid,
      quantity: item.quantity,
      originalPrice: item.product.price,
      discount: item.product.discount,
    };

    return newCart;
  });

  const order = await prisma.$transaction(async (transactionClient) => {
    for (const item of cartItems) {
      const product = await transactionClient.productItems.findFirst({
        where: {
          uid: item.productUid,
          stock: {
            gte: item.quantity,
          },
        },
      });

      if (!product) {
        throw new AppError("Insufficient Stock", 400);
      }

      await transactionClient.productItems.update({
        where: {
          uid: item.productUid,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const createdOrder = await transactionClient.productOrders.create({
      data: {
        totalPrice: totalPrice,
        deliveryCharge: deliveryCharge,
        userUid,
        userAddressUid,
        paymentMethod,
        deliveryMethod,
      },
    });

    await transactionClient.orderLine.createMany({
      data: cartItems.map((item) => ({
        price: item.originalPrice,
        discount: item.discount,
        qunatity: item.quantity,
        orderUid: createdOrder.uid,
        productUid: item.productUid,
      })),
    });

    await transactionClient.cart.deleteMany({
      where: {
        userUid,
      },
    });

    return createdOrder;
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});
