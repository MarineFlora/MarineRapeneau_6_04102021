//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------// 

// import de bcrypt pour chiffrer les mots de passe
const bcrypt = require('bcrypt');
// import du modele utilisateur
const User = require('../models/User');

// infrastructure necessaire pour les routes d'authentification
// fonction signup pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // fonction asynchrone de cryptage du mot de passe 
    // avec le mot de passe du corps de la requête passée par le front-end et le nombre d'éxécution en argument
    bcrypt.hash(req.body.password, 10)
    // on recupere le hash, 
        .then(hash => {
            // on enregistre le hash dans un nouveau user avec l'email de la requete
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // on enregistre cet user dans la base de donnée
            user.save()
                // message de réussite renvoyé en json, code 201 : requête réussie + création de source
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // ou message en cas d'erreur, code 400 mauvaise requete du client
                .catch(error => res.status(400).json({ error}));
        })
    // message erreur code 500 : erreur serveur
        .catch(error => res.status(500).json({ error }));
};

// fonction login pour connecter les users existants
exports.login = (req, res, next) => {

};