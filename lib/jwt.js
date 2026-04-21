import jwt from "jsonwebtoken";

export function generateToken(user, res) {
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    },
  );
}

export function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}
