import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET || "secret";
  try {
    const jwtDecoded = jwt.verify(token, secret);
    req.user = jwtDecoded;
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  next();
};
