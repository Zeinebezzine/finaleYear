const UserModel = require("../models/Utilisateur");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!";
const bcrypt = require("bcrypt");
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
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign(
            {
              email: user.email,
               id: user._id,
              name: user.nom,
              role: user.role,
            },
            jwtSecret,
            { expiresIn: "4h" },
            (err, token) => {
              if (err) {
                console.error("Error generating JWT token:", err);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }
              // Respond with user data and token
              res.json({ user, token });
            }
          );
          res.cookie("token", token);
        } else {
          // Passwords do not match
          res.json("Mot de passe erroné");
        }
      } else {
        // User not found
        res.json("Utilisateur non enregistré,Contactez l'administrateur!");
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};
