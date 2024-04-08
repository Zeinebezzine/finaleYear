const UserModel = require("../models/Utilisateur");
const EtablissementModel = require("../models/Etablissement");

//ajout directeur
exports.ajoutDirecteur = async (req, res) => {
  try {
    const { nom, prenom, email, password, tel, CIN, establishmentId } =
      req.body;
    const role = "directeur";
    console.log({ nom, prenom, email, password, tel, CIN, establishmentId });
    const directeurExist = await UserModel.findOne({ email });
    if (directeurExist) {
      return res.status(409).json({ statusCode: 409, message: "Directeur existe déjà" });

    }

    // Find the establishment by its ObjectId
    const foundEstablishment = await EtablissementModel.findById(
      establishmentId
    );
    if (!foundEstablishment) {
      return res.status(404).json({ message: "Établissement non trouvé" });
    }

    const newDirector = new UserModel({
      nom,
      prenom,
      email,
      tel,
      password,
      role,
      CIN,
      establishmentId: foundEstablishment._id,
      establishmentName: foundEstablishment.nom,
    });
    
    await newDirector.save();
    res.status(201).json({ message: "Directeur ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout:", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

//afficher
exports.getDirectors = async (req, res) => {
  try {
    const directors = await UserModel.find({ role: "directeur" });

    // Fetch establishment name for each director
    const directorsWithEstablishment = await Promise.all(
      directors.map(async (director) => {
        const establishment = await EtablissementModel.findById(
          director.establishmentId
        );
        const establishmentName = establishment
          ? establishment.nom
          : "Unknown Establishment";
        return { ...director._doc, Etablissement: establishmentName }; // Include establishment name in director object
      })
    );

    res.json(directorsWithEstablishment);
  } catch (error) {
    console.error("Error fetching directors:", error);
    res.status(500).json({ message: "Error fetching directors" });
  }
};

exports.updateDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const updatedRecord = req.body;

    const updatedDirector = await UserModel.findByIdAndUpdate(
      directorId,
      updatedRecord,
      { new: true }
    );

    res.json(updatedDirector);
  } catch (error) {
    console.error("Error updating director:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
