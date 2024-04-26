const ClasseModel = require("../models/Classe");

exports.ajoutClasse = async (req, res) => {
  try {
    const { type, niveau, libelle } = req.body;

    const ClasseExist = await ClasseModel.findOne({ type, niveau, libelle });
    if (ClasseExist) {
      return res.status(409).json({ message: "Classe existe" });
    }
    const newClasse = new ClasseModel({ type, niveau, libelle });
    await newClasse.save();
    return res.status(200).json({ message: "Classe ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une classe", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de la classe" });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await ClasseModel.find();
    if (classes.length === 0) {
      console.log("Aucun classe");
    }
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteClasse = async (req, res) => {
  try {
    classId = req.params.id;
    const classe = await ClasseModel.findByIdAndDelete(classId);
    return res.status(200).json({ message: "Classe deleted successfully" });
  } catch (error) {
    console.error("Error deleting classe", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getClassById = async (req, res) => {
  const classId = req.params.id;
  try {
    const Classe = await ClasseModel.findOne({ _id: classId });
    res.json(Classe);
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
