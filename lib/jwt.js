import jwt from "jsonwebtoken";

export function generateToken(user, res) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export async function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}
