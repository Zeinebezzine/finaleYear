const UserModel = require("../models/Utilisateur");
exports.ajoutDirecteur = async(req, res)=>{
  try{
    const {nom,prenom,email,password,tel}= req.body;
    const role = "director";

    const newDirector = new UserModel({
      nom,prenom,email,tel,password,role
    });
    await newDirector.save()
      res.json(201).json({message:"Directeur ajouté avec succés"});}
     catch (error) {console.log("erreur d'ajout,erreur");
     res.status(500).json({message:"Erreur d'ajout"});
    
    
  }
};
