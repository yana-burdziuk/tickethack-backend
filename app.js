const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Fichier qui connecte à la base de données MongoDB
require('./connection');

// Import des routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');    // Routes pour créer ou connecter un utilisateur
const tripsRouter = require('./routes/trips');    // Routes pour chercher les trajets
const cartRouter = require('./routes/cart');      // Routes pour ajouter/supprimer des trajets dans le panier

const app = express();

// Permet au frontend d’accéder au backend (obligatoire sinon ça bloque)
app.use(cors());

// Affiche les requêtes dans le terminal (pratique pour voir ce qui se passe)
app.use(logger('dev'));

// Pour qu’on puisse lire les données envoyées en JSON dans les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Permet de lire les cookies (même si on ne les utilise pas pour l’instant)
app.use(cookieParser());

// Sert les fichiers du dossier 'public' si on a besoin (genre des images, fichiers HTML ou autres trucs statiques)
app.use(express.static(path.join(__dirname, 'public')));

// Ici on définit les différentes "parties" de l’appli accessibles via des URL spécifiques
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/cart', cartRouter);

// On exporte l'appli pour qu’elle soit utilisable ailleurs (genre dans le fichier www)
module.exports = app;