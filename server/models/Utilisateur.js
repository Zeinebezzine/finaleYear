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
  establishment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etablissement", // Reference to the Establishment model
  },
});
const UserModel = mongoose.model("Utilisateur", UserSchema);
module.exports = UserModel;
