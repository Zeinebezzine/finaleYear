const ProfesseurModel = require("../models/Professeur");

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
    } = req.body;

    console.log("Request Body:", req.body);
    const profExist = await ProfesseurModel.findOne({ email });
    if (profExist) {
      return res.status(409).json({ message: "Enseignant existe déjà" });
    }

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
    });

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
    console.log(professors);
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
    console.erroe("Error deleting prof", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
