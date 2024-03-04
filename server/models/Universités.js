const mongoose = require("mongoose");
const EtablissementSchema = require("./Etablissement");
const UniversitySchema = new mongoose.Schema({
  id: Number,
  nom: {
    type: String,
    required: true,
  },
  Etablissement: [{nom: String,
    tel: [String], 
    fax: [String], 
    email: String,}],
});

const UniversityModel = mongoose.model("universités", UniversitySchema);

module.exports = UniversityModel;
