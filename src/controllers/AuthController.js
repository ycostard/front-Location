// src/controllers/AuthController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../utils/token");

const AuthController = {
  async register(req, res) {
    try {
      const { nom, prenom, mail, password, pays, ville, rue, cp } = req.body;

      if (!nom || !prenom || !mail || !password || !pays || !ville || !rue || !cp)
        return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });

      const existingUser = await User.findByEmail(mail);
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create(userData = { nom, prenom, mail, password: hashedPassword, pays, ville, rue, CP: parseInt(cp) });

      return res
        .status(201)
        .json({ message: "Utilisateur enregistré avec succès." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de l'enregistrement de l'utilisateur.",
      });
    }
  },

  async login(req, res) {
    try {
      const { mail, password } = req.body;

      if (!mail || !password)
        return res.status(400).json({ message: "Email ou password vide." });

      const user = await User.findByEmail(mail);
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.password = undefined;
      return res.json({ accessToken, refreshToken, user });
    } catch (error) {
      //console.error(error);
      return res
        .status(500)
        .json({ message: "Une erreur est survenue lors de la connexion." });
    }
  },

  async refreshTokens(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken)
        return res.status(400).json({ message: "RefreshToken vide." });

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        return res.status(401).json({ message: "Refresh token invalide." });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
      }

      const accessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      return res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(500).json({
        message: "Une erreur est survenue lors de la régénération des tokens.",
      });
    }
  },

  async verifToken (req, res) {
    try {
      const { token } = req.body;

      if (!token)
        return res.status(400).json({ message: "Token vide." });

      const decoded = verifyAccessToken(token);
      if (!decoded) {
        return res.status(401).json({ message: "Token invalide." });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
      }

      return res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la vérification du token.",
      });
    }
  }
};

module.exports = AuthController;
