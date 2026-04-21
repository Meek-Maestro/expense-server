import { body } from "express-validator";

export const signupValidator = [
  body("first_name")
    .notEmpty()
    .isString()
    .withMessage("First name is required"),
  body("last_name").notEmpty().isString().withMessage("Last name is required"),
  body("email")
    .isEmail()
    .notEmpty()
    .normalizeEmail()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be more than 6 characters long"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .isString()
    .withMessage("Username or password is incorrect"),
];
