const mongoose = require("mongoose");

const Semesterchema = new mongoose.Schema({
  semster:String,
  startDate: Date,
  endDate: Date,
  anneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Annee",
  },
});

const SemesterModel = mongoose.model("semester", Semesterchema);

module.exports = SemesterModel;
