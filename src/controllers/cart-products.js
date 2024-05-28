import prisma from "../../prisma/index.js";

export const getAllCartProducts = async (req, res) => {
  try {
    const carts = await prisma.carts.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).send({
      message: "Carts fetched successfully",
      data: carts,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error fetching carts",
    });
  }
};

export const createNewCartProduct = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const cart = await prisma.carts.create({
      data: {
        userId,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).send({
      message: "Cart created successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send({
      error: "Error creating cart",
    });
  }
};
