const UserModel = require("../models/Utilisateur");

exports.ajoutDirecteur = async (req, res) => {
  try {
    const { nom, prenom, email, password, tel, CIN } = req.body;
    const role = "directeur";

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

exports.updateDirector = async(reqres)=>{
  try{
    const{id} = req.params
    const { nom,prenom,email,password,tel,CIN} = req.body;
    const director = await UserModel.findById(id)

    director.nom = nom || director.nom;
    director.prenom = prenom || director.prenom;
    director.email = email || director.email;
    director.tel = tel || director.tel;
    director.password = password || director.password;
    director.CIN = CIN || director.CIN;

    await director.save();
    res.json({ message: "Director updated successfully", director });
  } catch (error) {
    console.error("Error updating director:", error);
    res.status(500).json({ message: "Error updating director" });
  }
};
