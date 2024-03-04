const mongoose = require("mongoose");

const EtablissementSchema = new mongoose.Schema({
  nom: String,
  tel: [String], 
  fax: [String], 
  email: String,
});

const EtablissementModel = mongoose.model("Etablissement", EtablissementSchema);

module.exports = EtablissementModel;
