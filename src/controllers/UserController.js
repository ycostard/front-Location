const userModel = require("../models/User");

const UserController = {
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Vérifie si l'identifiant de l'utilisateur est valide
      if (!isValidUserId(id)) {
        return res.status(400).json({
          message: "L'identifiant de l'utilisateur n'est pas valide.",
        });
      }

      const user = await userModel.findById(parseInt(id));

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération de l'utilisateur.",
      });
    }
  },

};

function isValidUserId(userId) {
  // Vérifie si l'identifiant de l'utilisateur est valide
  // Exemple de validation : Vérifier si l'identifiant est un entier positif
  return Number.isInteger(parseInt(userId)) && parseInt(userId) > 0;
}
module.exports = UserController;
