// On importe la connexion à la base de données (MongoDB)
require('./models/connection');

// On importe le modèle Mongoose pour les trajets
const Trip = require('./models/Trips');

// On prépare des exemples de trajets pour remplir la base
const tripsData = [
  {
    departure: 'Paris',
    arrival: 'Lyon',
    date: new Date('2025-05-10'), // La date du trajet
    price: 45,                    // Prix en euros
    departureTime: '08:30',      // Heure de départ (en string)
  },
  {
    departure: 'Lille',
    arrival: 'Marseille',
    date: new Date('2025-05-11'),
    price: 70,
    departureTime: '09:15',
  },
  {
    departure: 'Bordeaux',
    arrival: 'Toulouse',
    date: new Date('2025-05-10'),
    price: 35,
    departureTime: '14:45',
  },
  {
    departure: 'Nantes',
    arrival: 'Nice',
    date: new Date('2025-05-12'),
    price: 90,
    departureTime: '06:50',
  },
  {
    departure: 'Strasbourg',
    arrival: 'Lyon',
    date: new Date('2025-05-10'),
    price: 60,
    departureTime: '17:00',
  },
];

// On supprime tous les trajets existants pour repartir de zéro
Trip.deleteMany()
  // Ensuite on insère nos trajets test dans la base
  .then(() => Trip.insertMany(tripsData))
  // Si tout s’est bien passé, on affiche un message de confirmation
  .then(() => {
    console.log('Base de données remplie avec des trajets de test');
    process.exit(); // On ferme le script
  })
  // Si y'a une erreur, on l'affiche
  .catch(err => console.error(err));
