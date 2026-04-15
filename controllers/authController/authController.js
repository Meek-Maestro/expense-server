import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

export async function SignUp(req, res) {

  const { first_name, last_name, email, password } = req.body;
  console.log("Request body: ",req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const saltRounds = 10;
  const new_id = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      `INSERT INTO USERS (id, first_name, last_name, email, password) VALUES
       ('${new_id}','${first_name}', '${last_name}', '${email}', '${hashedPassword}')`
    );
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser.rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await pool.query(`SELECT * FROM USERS WHERE email='${email}'`);
    if (!user) return res.status(404).send("User not found");
    const authenticate = await bcrypt.compare(password, user.rows[0]?.password);
    if (!authenticate)
      return res.status(401).json({ message: "Invalid email or password" });
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error?.message });
    console.log(error);
  }
}