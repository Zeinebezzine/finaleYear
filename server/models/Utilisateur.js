const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  CIN: Number,
  tel: String,
  role: {
    type: String,
    enum: ["directeur", "rect1", "rect2", "financier", "pedagogique"],
    required: true,
  },
  idUni: Number,
  idEtab: {
    type: mongoose.Schema.Types.ObjectId, //establishmentId is an object
    ref: "etablissements", // Reference to the Establishment model
  },
});
const UserModel = mongoose.model("utilisateurs", UserSchema);
module.exports = UserModel;
