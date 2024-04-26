const mongoose = require("mongoose");

const ProfSemesterSchema = new mongoose.Schema({
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professeur", // Reference to the Professeur model
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semestre", // Reference to the Semester model
    required: true,
  },
  dueTD: {
    type: Number,
  },
  dueCours: {
    type: Number,
  },
  dueTP: {
    type: Number,
  },
  dueCintg: {
    type: Number,
  },
});

const ProfSemesterModel = mongoose.model("ProfSemester", ProfSemesterSchema);

module.exports = ProfSemesterModel;
