const mongoose = require("mongoose");
const professeurSchema = new mongoose.Schema({
  nomComplet: String,
  email: String,
  CIN: String,
  RIB: Number,
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
