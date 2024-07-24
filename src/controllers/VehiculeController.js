const Vehicule = require("../models/Vehicule");
const vehiculeModel = require("../models/Vehicule");

const VehiculeController = {
  async getALLVehiculeByToken(req, res) {
    try {
      const { id } = req.params;

      // Vérifie si l'identifiant de l'utilisateur est valide
      if (!isValidVehiculeId(id)) {
        return res.status(400).json({
          message: "L'identifiant du vehicule n'est pas valide.",
        });
      }

      const vehicule = await vehiculeModel.findById(parseInt(id));

      return res.status(200).json({ vehicule });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération du vehicule.",
      });
    }
  },


  async createVehicule(req, res) {
    try {
      const { marque, modele, couleur, kilometrage, carburant, photo } = req.body;

      if (!marque || !modele || !couleur || !kilometrage || !carburant || !photo )
        return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });

      const newVehicule = await Vehicule.create(vehiculeData = { marque, modele, couleur, kilometrage: parseInt(kilometrage), carburant, photo });

      return res
        .status(201)
        .json({ message: "Vehicule enregistré avec succès." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de l'enregistrement du vehicule.",
      });
    }
  },

};

function isValidVehiculeId(vehiculeId) {
  // Vérifie si l'identifiant de l'utilisateur est valide
  // Exemple de validation : Vérifier si l'identifiant est un entier positif
  return Number.isInteger(parseInt(vehiculeId)) && parseInt(vehiculeId) > 0;
}
module.exports = VehiculeController;
