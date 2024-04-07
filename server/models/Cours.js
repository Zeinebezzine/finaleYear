const mongoose = require("mongoose");

const CoursSchema = new mongoose.Schema({
  nbre_h: Number,
  type: String,
  coeff: Number,
  profId: { type: mongoose.Schema.Types.ObjectId, ref: "Professeur" },
  matId: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
  profName: String,
  matierName: String,
  className: String,
});

const coursModel = mongoose.model("Cours", CoursSchema);

module.exports = coursModel;
