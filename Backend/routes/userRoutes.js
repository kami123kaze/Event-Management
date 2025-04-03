const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { loginUser } = require("../controllers/userController");

//validation rules 
const validateUser = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];



const userController = require("../controllers/userController");

//  API routes impoortant**
router.post("/", validateUser, userController.createUser);  // Create user && validate
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", userController.updateUser); // Update user
router.delete("/:id", userController.deleteUser); // Delete user
router.post("/login", loginUser); // user login && jwt authentication

module.exports = router;
