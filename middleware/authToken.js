import jwt from "jsonwebtoken";

export async function validateUser(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token)
  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
