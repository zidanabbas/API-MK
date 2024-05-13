import prisma from "../prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  res.status(201).send({ message: "User created successfully", data: result });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  if (!user.password) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = { id: user.id, name: user.name, email: user.email };
    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = 60 * 60 * 1;
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
    return res.status(200).send({
      message: "login successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } else {
    return res.status(500).send({ message: "Internal server error" });
  }
};
