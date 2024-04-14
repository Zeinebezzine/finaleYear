const mongoose = require("mongoose");

const CoursSchema = new mongoose.Schema({
  semestre: String,
  profId: { type: mongoose.Schema.Types.ObjectId, ref: "Professeur" },
  matId: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
  nbr_h_C: Number,
  nbr_grp_C: Number,
  nbr_semaine_C: Number,
  nbr_h_TD: Number,
  nbr_grp_TD: Number,
  nbr_semaine_TD: Number,
  nbr_h_TP: Number,
  nbr_grp_TP: Number,
  nbr_semaine_TP: Number,
  nbr_h_Cintg: Number,
  nbr_grp_Cintg: Number,
  nbr_semaine_Cintg: Number,
});

const coursModel = mongoose.model("Cours", CoursSchema);

module.exports = coursModel;
