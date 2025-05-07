const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Trip = require('../models/Trips');

// POST /cart — Ajouter un trajet au panier d’un utilisateur
router.post('/', (req, res) => {
  const { userId, tripId } = req.body;

  if (!userId || !tripId) {
    return res.json({ result: false, error: 'Champs manquants' });
  }

  Trip.findById(tripId).then(trip => {
    if (!trip) {
      return res.json({ result: false, error: 'Trajet non trouvé' });
    }

    const newCartItem = new Cart({ user: userId, trip: tripId });

    newCartItem.save().then(savedItem => {
      res.json({ result: true, cartItem: savedItem });
    }).catch(err => {
      res.json({ result: false, error: 'Erreur lors de la sauvegarde du panier' });
    });
  }).catch(err => {
    res.json({ result: false, error: 'Erreur lors de la recherche du trajet' });
  });
});

// GET /cart/:userId — Voir tous les trajets dans le panier d’un utilisateur
router.get('/:userId', (req, res) => {
  Cart.find({ user: req.params.userId })
    .populate('trip')
    .then(cartItems => {
      res.json({ result: true, cart: cartItems });
    })
    .catch(err => {
      res.json({ result: false, error: 'Erreur lors de la récupération du panier' });
    });
});

// DELETE /cart/:userId/:tripId — Supprimer un trajet du panier
router.delete('/:userId/:tripId', (req, res) => {
  Cart.findOneAndDelete({ user: req.params.userId, trip: req.params.tripId })
    .then(deleted => {
      if (deleted) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: 'Élément non trouvé dans le panier' });
      }
    })
    .catch(err => {
      res.json({ result: false, error: 'Erreur lors de la suppression' });
    });
});

module.exports = router;