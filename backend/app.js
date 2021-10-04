//----------------------- fichier contenant l'application Express -----------------------// 

// import Express
const express = require('express');
// import du package body-parser pour extraire l'objet JSON des demandes POST
const bodyParser = require('body-parser');
// import de mongoose
const mongoose = require('mongoose');
// import path, donne accès au chemin de notre système de fichier
const path = require('path');
// import fichier config
const config = require('./config.js');

//import des router


// création de l'application express
const app = express();

//connecter base de donnée à mongoose pour faciliter interaction 
mongoose.connect(`mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@cluster0.umj8q.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`, 
    { useNewUrlParser : true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware pour résoudre problèmes de CORS et permettre à l'accès à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//middleware global, transforme le corps de la requete en objet javascript utilisable
// à partir de ce middleware on a acces au corps de la requête
app.use(bodyParser.json());



//export de l'application
module.exports = app;