const UserModel = require("../models/Utilisateur");

exports.ajoutDirecteur = async (req, res) => {
  try {
    const { nom, prenom, email, password, tel } = req.body;
    const role = "directeur";

    const newDirector = new UserModel({
      nom,
      prenom,
      email,
      tel,
      password,
      role,
    });

    await newDirector.save();
    res.status(201).json({ message: "Directeur ajouté avec succès" });
  } catch (error) {
    console.error("erreur d'ajout", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

exports.getDirectors = async (req, res) => {
  try {
    const directors = await UserModel.find({ role: "directeur" }); 
    res.json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    res.status(500).json({ message: "Error fetching directors" });
  }
};

