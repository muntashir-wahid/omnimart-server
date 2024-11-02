const prisma = require("../../../database/client");

const catchAsync = require("../../utils/catchAsync");

exports.getCart = catchAsync(async (req, res) => {
  const { uid: userUid } = req.user;

  const cart = await prisma.cart.findFirst({
    where: {
      userUid,
    },
    select: {
      CartItems: {
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
              discount: true,
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
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.createCart = catchAsync(async (req, res) => {
  const { user, cart: existingCart } = req;
  const { productUid } = req.body;

  let cart;

  // User have no cart
  if (!existingCart) {
    cart = await prisma.$transaction(async function (transactionClient) {
      const cartInstance = await transactionClient.cart.create({
        data: {
          userUid: user.uid,
        },
      });

      const cartProduct = await transactionClient.cartItems.create({
        data: {
          productUid,
          quantity: 1,
          cartUid: cartInstance.uid,
        },
      });

      await transactionClient.productItems.update({
        where: {
          uid: productUid,
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });

      return {
        ...cartInstance,
        ...cartProduct,
      };
    });
  }

  // User Already has a cart
  if (existingCart) {
    // Check for existing cart product
    const existingProduct = await prisma.cartItems.findFirst({
      where: {
        cartUid: existingCart.uid,
        productUid,
      },
    });

    // Product is new to cart
    if (!existingProduct) {
      cart = await prisma.$transaction(async function (transactionClient) {
        const cartProduct = await transactionClient.cartItems.create({
          data: {
            cartUid: existingCart.uid,
            productUid,
            quantity: 1,
          },
        });

        await transactionClient.productItems.update({
          where: {
            uid: productUid,
          },
          data: {
            stock: {
              decrement: 1,
            },
          },
        });

        return {
          ...cartProduct,
          ...cartProduct,
        };
      });
    }

    // Already in the cart
    if (existingProduct) {
      cart = await prisma.$transaction(async function (transactionClient) {
        const cartProduct = await transactionClient.cartItems.update({
          where: {
            uid: existingProduct.uid,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });

        await transactionClient.productItems.update({
          where: {
            uid: productUid,
          },
          data: {
            stock: {
              decrement: 1,
            },
          },
        });

        return {
          ...cartProduct,
          ...cartProduct,
        };
      });
    }
  }

  res.status(201).json({
    status: "success",
    data: {
      cart,
    },
  });
});
