const mongoose = require("mongoose");
const UserSchema = require("./Utilisateur");

const DirecteurSchema = new mongoose.Schema({
  idEst : Number,
});

//discriminating from the User model based on the 'role' field(inherance)
const DirecteurModel = UserSchema.discriminator("directeur", DirecteurSchema);

module.exports = DirecteurModel;
