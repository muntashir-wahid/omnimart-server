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
          uid: true,
          quantity: true,
          product: {
            select: {
              uid: true,
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
  const { productUid, decrement: decrementItem } = req.body;

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

        select: {
          quantity: true,
          uid: true,
          product: {
            select: {
              uid: true,
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
      cart = await prisma.cartItems.create({
        data: {
          cartUid: existingCart.uid,
          productUid,
          quantity: 1,
        },

        select: {
          quantity: true,
          uid: true,
          product: {
            select: {
              uid: true,
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
      });
    }

    // Already in the cart
    if (existingProduct) {
      if (decrementItem && existingProduct.quantity === 1) {
        await prisma.cartItems.delete({
          where: {
            uid: existingProduct.uid,
          },
        });
        cart = null;
      } else {
        // Check for stock when increment the stock
        if (!decrementItem) {
          const hasStock = await prisma.productItems.findFirst({
            where: {
              uid: existingProduct.productUid,
              stock: {
                gt: existingProduct.quantity,
              },
            },
          });

          if (!hasStock) {
            throw new Error("Insufficient Stock");
          }
        }

        cart = await prisma.cartItems.update({
          where: {
            uid: existingProduct.uid,
          },
          data: {
            quantity: {
              ...(decrementItem ? { decrement: 1 } : { increment: 1 }),
            },
          },

          select: {
            quantity: true,
            uid: true,
            product: {
              select: {
                uid: true,
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
        });
      }
    }
  }

  res.status(201).json({
    status: "success",
    data: {
      cart,
    },
  });
});
