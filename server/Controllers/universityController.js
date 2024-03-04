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
  const universityId = 7;

  UniversityModel.findById(universityId)
    .then((university) => {
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      const establishments = university.establishments;
      res.json(establishments);
    })
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
};
