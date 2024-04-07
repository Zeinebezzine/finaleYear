const coursModel = require("../models/Cours");
const ProfesseurModel = require("../models/Professeur");
const MatiereModel = require("../models/Matiere");
// const ClasseModel = require("../models/Classe");

exports.ajoutCours = async (req, res) => {
  try {
    const { coeff, type, nbre_h, classId, matId, profId } = req.body;
    console.log(req.body);
    const coursExiste = await coursModel.findOne({
      coeff,
      type,
      nbre_h,
      classId,
      matId,
      profId,
    });
    if (coursExiste) {
      return res.status(409).json({ message: "Cours existe déjà" });
    }
    // Find the prof by its ObjectId
    const foundProf = await ProfesseurModel.findById(profId);
    if (!foundProf) {
      return res.status(404).json({ message: "Prof non trouvé" });
    }
    // Find the subhject by its ObjectId
    const matiereExiste = await MatiereModel.findById(matId);
    if (!matiereExiste) {
      return res.status(404).json({ message: "Matiere non trouvé" });
    }
    const newCours = new coursModel({
      coeff,
      type,
      nbre_h,
      classId,
      matId: matiereExiste._id,
      profId: foundProf._id,
      profName: foundProf.nomComplet,
      matierName: matiereExiste.libelle,
    });
    await newCours.save();
    res.status(201).json({ message: "Cours ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
