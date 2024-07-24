const express = require("express");
const vehiculeController = require("../controllers/VehiculeController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/vehicules", authMiddleware, vehiculeController.getALLVehiculeByToken);
router.post("/vehicules", authMiddleware, vehiculeController.createVehicule);
module.exports = router;