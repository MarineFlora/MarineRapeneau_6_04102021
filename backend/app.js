//----------------------- fichier contenant l'application Express -----------------------// 

// import Express
const express = require('express');
// import du package body-parser pour extraire l'objet JSON des demandes POST
const bodyParser = require('body-parser');

// création de l'application express
const app = express();

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