const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Trip = require("../models/Trips");

// GET /trips - on recherche si les trajets existent
router.get("/", (req, res) => {
  // on récupère les paramètres de l’URL
  const { departure, arrival, date } = req.query;

  // on vérifie que tous les champs sont bien présents
  if (!departure || !arrival || !date) {
    return res.json({ result: false, error: "Missing field" });
  }

  // on cherche dans la base les trajets
  Trip.find({
    departure,
    arrival,
    // recherche les trajets qui sont aujourd'hui
    date: {
      $gte: new Date(date), // début de la journée
      $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000), // fin de la journée
    },
  }).then((trips) => {
    res.json({ result: true, trips });
  });
});

module.exports = router;
