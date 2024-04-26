const mongoose = require("mongoose");

const professeurSchema = new mongoose.Schema({
  nomComplet: { type: String, required: true },
  nomComplet_arabe: { type: String },
  email: { type: String, required: true },
  CIN: { type: String, required: true },
  RIB: { type: String, required: true },
  tel: { type: String, required: true },
  grade: { type: String, required: true },
  statut: { type: String, required: true },
  DDO: { type: String, required: true },
  dueCours: { type: Number, required: true },
  dueTD: { type: Number, required: true },
  dueTP: { type: Number, required: true },
  dueCintg: Number,
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etablissement",
  },
  // agentId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Utilisateur",
  // },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement",
  },
});

const ProfesseurModel = mongoose.model("professeurs", professeurSchema);
module.exports = ProfesseurModel;
