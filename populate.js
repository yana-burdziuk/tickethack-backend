require('./models/connection');
tripsData = require('./trips.json')
const Trip = require('./models/Trips');

tripsData.forEach(trip => {
  trip.date = new Date(trip.date.$date);
});

Trip.deleteMany()
  .then(() => Trip.insertMany(tripsData))
  .then(() => {
    //console.log(tripsData) 
    process.exit(); 
  })

