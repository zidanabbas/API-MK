import prisma from "../../prisma/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    res.status(200).send({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createNewUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userRole = role || "user";
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Name, email, and password are required",
        data: null,
      });
    }
    const newUsers = await prisma.users.create({
      data: {
        name,
        email,
        password,
        role: userRole,
      },
    });
    res.status(201).send({
      message: "User created successfully",
      data: newUsers,
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).send({
      message: "Error creating users",
      serverMessage: error,
    });
  }
};

export const updateUsers = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const updateUsers = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password,
        role,
      },
    });
    res.status(200).send({
      message: "User updated successfully",
      data: updateUsers,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating user",
      serverMessage: error,
    });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUsers = await prisma.users.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).send({
      message: "User deleted successfully",
      data: deleteUsers,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting user",
      serverMessage: error,
    });
  }
};
