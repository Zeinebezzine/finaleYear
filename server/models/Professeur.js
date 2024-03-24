const mongoose = require("mongoose");
const professeurSchema = new mongoose.Schema({
  nomComplet: String,
  email: String,
  CIN: String,
  RIB: String,
  tel: String,
  grade: String,
  statut: String,
  DDO: String,
  dueCours: Number,
  dueTD: Number,
  dueTP: Number,
});
const ProfesseurModel = mongoose.model("professeurs", professeurSchema);
module.exports = ProfesseurModel;
