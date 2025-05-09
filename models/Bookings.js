const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trips',
  },
});

const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;