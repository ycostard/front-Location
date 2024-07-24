// src/routes/auth.js
const express = require("express");
const userController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/users/:id", authMiddleware, userController.getUserById);
module.exports = router;
