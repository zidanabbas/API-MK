import prisma from "../prisma/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.Products.findMany({});
    res.send(products);
    // console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

// export const createNewProduct = async (req, res) => {
//   try {
//     const { title, image, price, category, isAvailable, description } =
//       req.body;
//     const product = await prisma.Products.create({
//       data: {
//         title,
//         image,
//         price,
//         category,
//         isAvailable,
//         description,
//       },
//     });
//     res.status(201).send(product);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
