const UserModel = require("../models/Utilisateur");

exports.ajoutPedagogique = async (req, res) => {
  try {
    const { nom, prenom, email, password, tel, CIN } = req.body;
    const role = "pedagogique";

    const newDirector = new UserModel({
      nom,
      prenom,
      email,
      tel,
      password,
      role,
      CIN,
    });

    await newDirector.save();
    res.status(201).json({ message: "Admin pedagogique ajouté avec succès" });
  } catch (error) {
    console.error("erreur d'ajout", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};
