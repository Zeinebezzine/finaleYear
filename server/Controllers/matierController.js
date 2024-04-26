const MatiereModel = require("../models/Matiere");

exports.ajoutMatiere = async (req, res) => {
  try {
    const { nom_matiere } = req.body;
    const matierExist = await MatiereModel.findOne({ nom_matiere });
    if (matierExist) {
      return res.status(409).json({ message: "Matiere existe" });
    }

    const newMatiere = new MatiereModel({
      nom_matiere,
    });
    await newMatiere.save();
  } catch (error) {
    console.error("Erreur d'ajout d'une matiere", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};
exports.getmatiere = async (req, res) => {
  try {
    const matieres = await MatiereModel.find();
    if (matieres.length === 0) {
      return res.status(404).json({ message: "Aucun matiere" });
    }
    res.json(matieres);
  } catch (error) {
    console.error("Erreur d'affichage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteMatiere = async (req, res) => {
  try {
    const matierId = req.params.id;
    const matiereDeleted = await MatiereModel.findByIdAndDelete(matierId);
    return res.status(200).json({ message: "Matiere supprimé" });
  } catch (error) {
    console.error("Error deleting  a subject", error);
    res.status(500).json({ messaga: "Internal Server Error" });
  }
};

//get subject byID
exports.getMatierById = async (req, res) => {
  const matiereId = req.params.id;
  const matiere = await MatiereModel.findById(matiereId);
  res.json(matiere);
};
