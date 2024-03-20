const UserModel = require("../models/Utilisateur");

exports.ajoutRect2 = async (req, res) => {
  try {
    const { nom, prenom, email, password, tel, CIN } = req.body;
    const role = "rect2";

    // Fetch the Rect1 user from the database to get its idUni
    const rect1User = await UserModel.findOne({ role: "rect1" });
    if (!rect1User) {
      return res.status(404).json({ message: "Utilisateur Rect1 non trouvé" });
    }
    const idUni = rect1User.idUni;
    console.log(rect1User);

    const newRect2 = new UserModel({
      nom,
      prenom,
      email,
      tel,
      password,
      role,
      CIN,
      idUni,
    });
    console.log(newRect2);
    await newRect2.save();
    res.status(201).json({ message: "Agent 2 ajouté avec succès" });
  } catch (error) {
    console.error("erreur d'ajout", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

exports.getRect2 = async (req, res) => {
  try {
    // Assuming there is only one Rect2 user
    const rect2Data = await UserModel.findOne({ role: "rect2" });
    if (!rect2Data) {
      return res.status(404).json({ message: "Rect2 data not found" });
    }
    res.json(rect2Data);
  } catch (error) {
    console.error("Error fetching Rect2 data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
