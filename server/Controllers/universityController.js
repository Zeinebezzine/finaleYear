const UniversityModel = require("../models/Universités");

exports.getUniversities = (req, res) => {
  UniversityModel.find()
    .then((universities) => {
      if (!universities) {
        return res.status(404).json({ error: "Universités non trouvé" });
      }
      res.json(universities);
    })
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
};

//getByID
exports.getUniById = async (req, res) => {
  const UniId = req.params.id;
  const Uni = await UniversityModel.findById(UniId);
  res.json(Uni);
};
