const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String, // ou email, ou juste un nom générique
});

const User = mongoose.model('users', userSchema);
module.exports = User;