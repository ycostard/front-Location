// src/routes/auth.js
const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-tokens', AuthController.refreshTokens);
router.post('/verifyToken', AuthController.verifToken);

module.exports = router;