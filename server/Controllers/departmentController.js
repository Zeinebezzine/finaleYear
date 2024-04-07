const DepartmentModel = require("../models/Departement");
exports.ajoutDepartemnt = async (req, res) => {
  try {
    const { nom } = req.body;
    const departementExist = await DepartmentModel.findOne({ nom });
    if (!departementExist) {
      // Department does not exist, proceed with creation
      const newDepartment = new DepartmentModel(req.body);
      await newDepartment.save();
      return res.status(201).json(newDepartment);
    } else {
      // Department already exists, return 409 status
      return res.status(409).json({ message: "Ce département existe déjà" });
    }
  } catch (error) {
    console.error("Erreur d'ajout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDepartement = async(req, res)=>{
  try {
    const departements = await DepartmentModel.find()
    if(departements.length === 0){
      return res.status(404).json({message:'Aucun departement'})
    }
    res.json(departements)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }}
