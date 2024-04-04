import prisma from "../prisma/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.Products.findMany({});
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const { title, image, price, category, isAvailable, description } =
      req.body;
    const newProducts = await prisma.products.create({
      data: {
        title,
        image,
        price,
        category,
        isAvailable,
        description,
      },
    });
    res.status(201).send(newProducts);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, image, price, category, isAvailable, description } =
      req.body;

    if (
      !productId ||
      !title ||
      !image ||
      !price ||
      !category ||
      !isAvailable ||
      !description
    ) {
      return res.status(400).send("Missing required fields");
    }

    const productsData = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        title,
        image,
        price,
        category,
        isAvailable,
        description,
      },
    });
    res.status(201).send(productsData);
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = await prisma.products.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).send({
      message: "Product deleted successfully",
      data: productData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting product",
      serverMessage: error,
    });
  }
};
