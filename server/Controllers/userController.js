const UserModel = require("../models/Utilisateur");

exports.register = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Compte existant");
    } else {
      UserModel.create(req.body)
        .then((result) => res.json("Compte crée"))
        .catch((err) => res.json(err));
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Sucess");
      } else {
        res.json("Mot de passe erroné");
      }
    } else {
      res.json("Utilisateur non enregistré,Contactez l'administrateur!");
    }
  });
};
