const mongoose = require("mongoose");
const matiereSchema = new mongoose.Schema({
  nom_matiere: String,
});
const MatiereModel = mongoose.model("matieres", matiereSchema);
module.exports = MatiereModel;


