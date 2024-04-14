const coursModel = require("../models/Cours");
const ProfesseurModel = require("../models/Professeur");
const MatiereModel = require("../models/Matiere");
const ClasseModel = require("../models/Classe");

exports.ajoutCours = async (req, res) => {
  try {
    const {
      semestre,
      classId,
      matId,
      profId,
      nbr_h_C,
      nbr_grp_C,
      nbr_semaine_C,
      nbr_h_TD,
      nbr_grp_TD,
      nbr_semaine_TD,
      nbr_h_TP,
      nbr_grp_TP,
      nbr_semaine_TP,
      nbr_h_Cintg,
      nbr_grp_Cintg,
      nbr_semaine_Cintg,
    } = req.body;
    console.log(req.body);
    const coursExiste = await coursModel.findOne({
      profId,
      matId,
      classId,
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
    const classExiste = await ClasseModel.findById(classId);
    if (!classExiste) {
      return res.status(404).json({ message: "Classe non trouvé" });
    }
    const newCours = new coursModel({
      semestre,
      nbr_h_C,
      nbr_grp_C,
      nbr_semaine_C,
      nbr_h_TD,
      nbr_grp_TD,
      nbr_semaine_TD,
      nbr_h_TP,
      nbr_grp_TP,
      nbr_semaine_TP,
      nbr_h_Cintg,
      nbr_grp_Cintg,
      nbr_semaine_Cintg,
      matId: matiereExiste._id,
      profId: foundProf._id,
      classId: classExiste._id,
    });
    await newCours.save();
    res.status(201).json({ message: "Cours ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
