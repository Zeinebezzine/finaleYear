const EtablissementModel = require("../models/Etablissement");
exports.getEstablishment = (req, res) => {
  EtablissementModel.find()
    .then((establishments) => res.json(establishments))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
};
