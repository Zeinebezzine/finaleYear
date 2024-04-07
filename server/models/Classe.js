const mongoose = require("mongoose");
const classeSchema = new mongoose.Schema({
  type: String,
  niveau: Number,
  libelle: String,
});
const ClasseModel = mongoose.model("classes", classeSchema);
module.exports = ClasseModel;
