const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://lionelhelou:1rzbHeHoptf47Rtp@cluster0.lpkdv7k.mongodb.net/Tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));


module.exports = mongoose;
