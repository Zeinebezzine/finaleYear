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
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur", // Reference to the Establishment model
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur", // Reference to the Establishment model
  },
});
const ProfesseurModel = mongoose.model("professeurs", professeurSchema);
module.exports = ProfesseurModel;
