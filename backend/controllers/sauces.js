//----------------------- fichier contenant la logique appliquée à chaque route sauce -----------------------// 

// import du modele sauce
const Sauce = require('../models/Sauce');
// import file system pour avoir accès aux differentes opérations liées au systeme de fichier (ex: supprimer un fichier)
const fs = require('fs');


// création d'une sauce
exports.createSauce = (req, res, next) => {
    // transformation des informations de la requête (chaine JSON) en objet JS car on va traiter des fichiers
    const sauceObject = JSON.parse(req.body.sauce);
    // suppresion du champ id de la requete qui n'est pas le bon car l'id est généré automatiquement par mongoose
    delete sauceObject._id;
    // nouvelle instance de l'objet Sauce en lui passant un objet JS contenant les infos requise du corps de requete analysé
    const sauce = new Sauce({
        // on utlise l'opérateur spread ... pour faire une copie de tous les élements req.body
        // va copier les champs qu'il y a dans le corps de la requete et détailler le titre, le description etc
        ...sauceObject,
        // configuration de l'url de l'image
        // par : "protocole, http/https"://"racineduserveur(localhost:3000)"/images/nomfichier(configuré par multer)
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
   });
   // Enregistrement de la sauce dans la base de données
   // retourne une promise
    sauce.save()
        // on renvoi un code 201 pour une bonne création de ressource
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        // on récupère l'erreur avec un code 400
        .catch(error => res.status(400).json({ error })); 
};

// modification d'une sauce par son id
exports.modifySauce = (req, res, next) => {

};

// suppression d'une sauce par son id
exports.deleteSauce = (req, res, next) => {

};

// récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    // methode find pour obtenir la liste complète
    // retrourne une promise
    Sauce.find()
        // on récupère le tableau de toutes les sauces retournées dans la base données
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// récupération d'une sauce par son id 
exports.getOneSauce = (req, res, next) => {
    // findOne = trouve un seul
    // on veut que l'id de la sauce soit le même que le paramètre de requete
    Sauce.findOne({ _id: req.params.id })
        // cette sauce est retournée dans une promise et envoyée au front-end
        .then(sauce => res.status(200).json(sauce))
        // si aucune sauce trouvée, on envoi erreur 404
        .catch(error => res.status(404).json({ error }));
};