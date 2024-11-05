const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      orders: "Working on it",
    },
  });
});

exports.getOrder = catchAsync(async (req, res) => {
  const { orderUid } = req.params;

  res.status(200).json({
    status: "success",
    data: {
      order: "Working on it",
    },
  });
});

exports.createOrder = catchAsync(async (req, res) => {
  const { totalPrice, deliveryCharge, deliveryMethod, paymentMethod } =
    req.body;
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
        throw new Error("Insufficient Stock");
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
        addressUid: "Jashore",
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
