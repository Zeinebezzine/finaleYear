const UserModel = require("../models/Utilisateur");

exports.ajoutAgent = async (req, res) => {
  const directeur = await UserModel.findOne({ role: "directeur" });
  if (!directeur) {
    return res.status(404).json({ message: "Utilisateur Rect1 non trouvé" });
  }
  const establishmentId = directeur.establishmentId;
  try {
    const { nom, prenom, email, password, tel, CIN, role } = req.body;

    const newAgent = new UserModel({
      nom,
      prenom,
      email,
      tel,
      password,
      role,
      CIN,
      establishmentId,
    });

    await newAgent.save();
    res.status(201).json({ message: " ajouté avec succès" });
  } catch (error) {
    console.error("erreur d'ajout", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await UserModel.find({
      role: { $in: ["financier", "pedagogique"] },
    });
    if (!agents) {
      return res.status(404).json({ message: "Rect2 data not found" });
    }
    res.json(agents);
  } catch (error) {
    console.error("Error fetching Rect2 data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    const updatedRecord = req.body;

    const updatedAgent = await UserModel.findByIdAndUpdate(
      agentId,
      updatedRecord,
      { new: true }
    );
    res.json(updatedAgent);
  } catch (error) {
    console.error("Error updating director:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

