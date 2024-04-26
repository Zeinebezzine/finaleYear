const MatClassModel = require("../models/MatClass");
const MatiereModel = require("../models/Matiere");
const ClasseModel = require("../models/Classe");

exports.ajoutMatClass = async (req, res) => {
  try {
    const { classId, matId, h_C, h_TD, h_TP, h_cintg } = req.body;
    console.log(req.body);
    // vérifications  des données
    const matiereExiste = await MatiereModel.findById(matId);
    if (!matiereExiste) {
      return res.status(404).json({ message: "Matiere non trouvé" });
    }
    const classExiste = await ClasseModel.findById(classId);
    if (!classExiste) {
      return res.status(404).json({ message: "Classe non trouvé" });
    }
    const existe = await MatClassModel.findOne({
      classId,
      matId,
      h_C,
      h_TD,
      h_TP,
      h_cintg,
    });
    if (existe) {
      return res
        .status(409)
        .json({ message: "Cette matiere existe dans cette classe deja " });
    }
    const newMatClass = new MatClassModel({
      classId: classExiste._id,
      matId: matiereExiste._id,
      h_C,
      h_TD,
      h_TP,
      h_cintg,
    });
    await newMatClass.save();
    res.status(201).json({ message: "Ajouté par succé" });
  } catch (error) {
    console.error("erreur d'ajout ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//getById
exports.getMatierClassById = async (req, res) => {
  const matId = req.params.id;
  try {
    const matiereClasse = await MatClassModel.find({ matId: matId });
    res.json(matiereClasse);
  } catch (error) {
    console.error("Error fetching MatClass by matId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

