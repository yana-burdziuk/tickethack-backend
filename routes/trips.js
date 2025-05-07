const express = require('express');
const router = express.Router();
const Trip = require('../models/Trips'); // On importe le modèle Mongoose de trajet


// GET /trips : Rechercher des trajets
router.get('/', (req, res) => {
  const { departure, arrival, date } = req.query; // On récupère les paramètres de l’URL

  // Vérifie que tous les champs sont bien présents
  if (!departure || !arrival || !date) {
    return res.json({ result: false, error: 'Champs manquants dans la recherche.' });
  }

  // Requête dans la base pour trouver les trajets correspondant exactement
  Trip.find({
    departure,
    arrival,
    // Recherche les trajets qui ont lieu le jour indiqué (pas seulement l’heure)
    date: {
      $gte: new Date(date), // début de la journée
      $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) // fin de la journée
    },
  }).then(trips => {
    res.json({ result: true, trips });
  }).catch(error => {
    res.json({ result: false, error: 'Erreur lors de la recherche.' });
  });
});


// POST /trips : Ajouter un nouveau trajet
router.post('/', (req, res) => {
  const { departure, arrival, date, departureTime, price } = req.body; // Données envoyées par le frontend

  // Vérifie que tous les champs sont remplis
  if (!departure || !arrival || !date || !departureTime || !price) {
    return res.json({ result: false, error: 'Champs manquants pour créer un trajet.' });
  }

  // Création d’un nouveau trajet
  const newTrip = new Trip({
    departure,
    arrival,
    date: new Date(date), // On convertit la date pour MongoDB
    departureTime,
    price,
  });

  // Sauvegarde en base
  newTrip.save().then(trip => {
    res.json({ result: true, trip });
  }).catch(error => {
    res.json({ result: false, error: 'Erreur lors de la sauvegarde.' });
  });
});

module.exports = router;