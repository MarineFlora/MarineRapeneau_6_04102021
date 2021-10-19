//----------------------- configuration pour sécuriser la validation des champs de connexion -----------------------// 

// import package Ajv, permet validation champs au back-end
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})

// ajout pattern Regex pour sécuriser les entrées de connexion
const userSchema = {
  type: "object",
  properties: {
    email: {type: "string", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"},
    // mot de passe :  au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    password: {type: "string", pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
  },
  required: ["email", "password"],
  additionalProperties: false,
}

const validate = ajv.compile(userSchema)

module.exports = (req, res, next) => {
  const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ error: "Invalide : l'email doit être valide et le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial"});
    } else {
        next();
    }
};