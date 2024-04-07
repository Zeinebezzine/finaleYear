const ProfesseurModel = require("../models/Professeur");
const UserModel = require("../models/Utilisateur");
const DepartementModel = require("../models/Departement");

exports.ajoutProf = async (req, res) => {
  try {
    const {
      nomComplet,
      email,
      CIN,
      RIB,
      tel,
      grade,
      statut,
      DDO,
      dueCours,
      dueTD,
      dueTP,
      establishmentId,
      agentId,
      departmentId,
    } = req.body;

    console.log("Request Body:", req.body);

    // Check if a professor with the same email already exists
    const profExist = await ProfesseurModel.findOne({ email });
    if (profExist) {
      return res.status(409).json({ message: "Enseignant existe déjà" });
    }

    // Create a new ProfesseurModel instance
    const newProf = new ProfesseurModel({
      nomComplet,
      email,
      CIN,
      RIB,
      tel,
      grade,
      statut,
      DDO,
      dueCours,
      dueTD,
      dueTP,
      establishmentId,
      agentId,
      departmentId,
    });

    // Save the new professor
    await newProf.save();
    res.status(201).json({ message: "Professeur ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout:", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

exports.getProf = async (req, res) => {
  try {
    const professors = await ProfesseurModel.find();
    if (professors.length === 0) {
      return res.status(404).json({ message: "Aucun prof trouvé" });
    }
    res.json(professors);
  } catch (error) {
    console.error("Error fetching professors data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProf = async (req, res) => {
  try {
    const profId = req.params.id;
    const updatedRecord = req.body;
    const updatedProf = await ProfesseurModel.findByIdAndUpdate(
      profId,
      updatedRecord,
      { new: true }
    );
    res.json(updatedProf);
  } catch (error) {
    console.error("Error updating professor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProf = async (req, res) => {
  try {
    const profId = req.params.id;
    const deletedProf = await ProfesseurModel.findByIdAndDelete(profId);
    if (!deletedProf) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json({ message: "Professor deleted successfully!" });
  } catch (error) {
    console.error("Error deleting prof", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getPedagogiue = async (req, res) => {
//   try {
//     const agent = await UserModel.find({
//       role: { $in: [ "pedagogique"] },
//     });
//     if (!agent) {
//       return res.status(404).json({ message: " data not found" });
//     }
//     res.json(agent);
//   } catch (error) {
//     console.error("Error fetching  data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
