import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db.js";
import { SignUp, Login } from "./controllers/authController/authController.js";
import {
  signupValidator,
  loginValidator,
} from "./controllers/authController/validator.js";
import { validateUser } from "./middleware/authToken.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = 3505;

app.post("/signup", signupValidator, SignUp);
app.post("/login", loginValidator, Login);

app.get("/profile", validateUser, (req, res) => {
  res.json({ user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
  // connect to database
  dbConnect();
});
