const UniversityModel = require("../models/Universités");

exports.getUniversities = (req, res) => {
  UniversityModel.find()
    .then((universities) => {
      if (!universities) {
        return res.status(404).json({ erroe: "Universités non trouvé" });
      }
      res.json(universities);
    })
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
};

exports.getEstablishmentsForUniversity = (req, res) => {
  const id = 7;

  UniversityModel.findOne({ id: id })
    .then((university) => {
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      if (!university.Etablissement) {
        return res.status(404).json({ error: "Establishments not found for this university" });
      }
      const establishments = university.Etablissement;
      res.json(establishments);
    })
    .catch((error) => {
      console.error("Error fetching university:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};
