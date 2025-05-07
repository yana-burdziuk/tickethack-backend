const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // 🔗 foreign key vers users
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trips',
  },
});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;
