const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  CIN: String,
  tel: String,
  role: { type: String, enum: ["directeur", "rect1", "rect2", "financier"] },
});
const UserModel = mongoose.model("utilisateur", UserSchema);
module.exports = UserModel;
