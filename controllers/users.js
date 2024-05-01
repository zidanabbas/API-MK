export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};
