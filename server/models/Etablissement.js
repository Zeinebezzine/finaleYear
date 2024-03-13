const mongoose = require("mongoose");

const EtablissementSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  nom: String,
  tel: [String],
  fax: [String],
  email: String,
  idUni: { type: String, unique: true },
});

const EtablissementModel = mongoose.model("Etablissement", EtablissementSchema);

module.exports = EtablissementModel;
