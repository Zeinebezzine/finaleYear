const mongoose = require("mongoose");

const AnneeSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
});

const AnneeModel = mongoose.model("année", AnneeSchema);

module.exports = AnneeModel;
