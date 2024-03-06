const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  CIN: String,
  tel: String,
  role: {
    type: String,
    enum: ["directeur", "rect1", "rect2", "financier"],
    required: true,
  },
});
const UserModel = mongoose.model("utilisateurs", UserSchema);
module.exports = UserModel;
