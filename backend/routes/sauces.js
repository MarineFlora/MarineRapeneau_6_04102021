//----------------------- fichier présentant les routes sauce disponibles, à quel endpoint et leur fonction -----------------------// 

// import express
const express = require('express');
// creation du routeur
const router = express.Router();
// import du controller sauce
const saucesCtrl = require('../controllers/sauces');
// import middleware d'authentification à utiliser sur toutes les routes
const auth = require('../middleware/auth');
// import middleware multer pour gestion enregistrement images, après 'auth'
const multer = require('../middleware/multer-config');

// Routes avec action CRUD disponibles, avec leur endpoints, les middleware utilisés et leur fonction
// récupération (lecture) toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauces);
// récupération (lecture) une sauce selon son id (id automatique de mongoose)
router.get('/:id', auth, saucesCtrl.getOneSauce);
// création d'une sauce
router.post('/', auth, multer, saucesCtrl.createSauce);
// modification d'une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// suppression d'une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// traitement de l'option like/dislike
//router.post('/:id/like', auth, likeCtrl.likeStatus); // à mettre dans un fichier like

// export des routes
module.exports = router;