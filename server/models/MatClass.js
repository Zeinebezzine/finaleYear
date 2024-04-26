const mongoose = require("mongoose");

const MatClassSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  matId: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
  h_C: Number,
  h_TD: Number,
  h_TP: Number,
  h_cintg: Number,
});
const MatClassModel = mongoose.model("MatClass", MatClassSchema);
module.exports = MatClassModel;
