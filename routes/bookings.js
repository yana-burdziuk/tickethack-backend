const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');
const Trip = require('../models/Trips');


// POST /bookings - ajouter une réservation
router.post('/', (req, res) => {
  const { tripId } = req.body;

  if (!tripId) {
      return res.json({ result: false, error: 'Missing field' });
  }

  // chercher le trajet dans la base de données
  Trip.findById(tripId)
    .then(trip => {
      if (!trip) {
        return res.json({ result: false, error: 'No trip found' });
      }

      const newBooking = new Booking({ trip: tripId });

      newBooking.save()
        .then(savedBooking => {
          res.json({ result: true, booking: savedBooking });
        })

    })
});


// GET - recuperer les trajets validés depuis le cart
router.get('/', (req, res) => {
  Booking.find()
    .populate('trip')  
    .then(bookings => {
      res.json({ result: true, bookings });
    })
});

module.exports = router;
