const mongoose = require("mongoose");
//const EtablissementSchema = require("./Etablissement");
const UniversitySchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  Etablissement: [{ nom: String }],
});

const UniversityModel = mongoose.model("universités", UniversitySchema);

module.exports = UniversityModel;
