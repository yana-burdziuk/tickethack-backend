const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
  departureTime: String,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
