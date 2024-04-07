const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  nom: String,
});
const DepartmentModel = mongoose.model("departements", departmentSchema);
module.exports = DepartmentModel;
