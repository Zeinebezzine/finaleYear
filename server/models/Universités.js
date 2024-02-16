const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
});

const UniversityModel = mongoose.model("universités", UniversitySchema);

module.exports = UniversityModel;
