import prisma from "../prisma/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.Products.findMany({});

    res.status(200).send({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({
      message: "Error fetching products",
      serverMessage: error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.status(200).send({
      message: "Get product by id successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({
      message: "Error fetching product",
      serverMessage: error,
    });
  }
};

export const createNewProduct = async (req, res) => {
  const { title, price, category, isAvailable, description } = req.body;

  //cek apakah field sudah diisi
  if (!title || !price || !category || !isAvailable || !description) {
    return res.status(400).send({
      message: "Missing required fields",
      data: null,
    });
  }

  //cek apakah ada gambar
  if (!req.file) {
    return res.status(422).send({
      message: "Image is required",
    });
  }
  try {
    // const { image } = req.file.path;
    const newProducts = await prisma.products.create({
      data: {
        title,
        image: req.file.path,
        price: parseFloat(price),
        category,
        isAvailable: JSON.parse(isAvailable),
        description,
      },
    });
    res.status(201).send({
      message: "Product created successfully",
      data: newProducts,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({
      message: "Error creating product",
      serverMessage: error,
    });
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
      return res.status(400).send({
        message: "Missing required fields",
        data: null,
      });
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
    res.status(201).send({
      message: "Product updated successfully",
      data: productsData,
    });
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).send({
      message: "Error updating products",
      serverMessage: error,
    });
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
