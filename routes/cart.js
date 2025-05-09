const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Trip = require("../models/Trips");

// POST /cart - ajouter le trajet trouvé dans le panier
router.post("/", (req, res) => {
  const { tripId } = req.body;

  if (!tripId) {
    return res.json({ result: false, error: "No trip ID found" });
  }

  Trip.findById(tripId).then((trip) => {
    if (!trip) {
      return res.json({ result: false, error: "No trip found" });
    }

    const newCartItem = new Cart({ trip: tripId });

    newCartItem.save().then((savedItem) => {
      res.json({ result: true, cartItem: savedItem });
    });
  });
});

// GET /cart — voir tous les trajets dans le panier
router.get("/", (req, res) => {
  Cart.find()
    .populate("trip")
    .then((cartItems) => {
      res.json({ result: true, cart: cartItems });
    });
});

// DELETE /cart/:tripId — supprimer un trajet dans le panier
router.delete("/:tripId", (req, res) => {
  Cart.findOneAndDelete({ trip: req.params.tripId }).then((deleted) => {
    if (deleted) {
      res.json({ result: true, text: "Trip deleted" });
    } else {
      res.json({ result: false, error: "Trip does not exist" });
    }
  });
});

module.exports = router;
