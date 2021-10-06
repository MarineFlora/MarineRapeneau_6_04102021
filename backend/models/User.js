// import mongoose
const mongoose = require('mongoose');
// import de l'unique validator
const uniqueValidator = require('mongoose-unique-validator');

// création schema de l'user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// validator appliqué au schéma, on ne pourra pas avoir plusieurs users avec même adresse email et mot de passe
userSchema.plugin(uniqueValidator);

//exporte en tant que modèle
module.exports = mongoose.model('User', userSchema);