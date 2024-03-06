const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");

const DirecteurSchema = new mongoose.Schema({
  EtabID: Number,
});

//heritage  de la schema user
const DirecteurModel = UserSchema.discriminator("directeur", DirecteurSchema);

module.exports = DirecteurModel;
