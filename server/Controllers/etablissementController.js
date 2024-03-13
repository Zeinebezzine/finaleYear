const EtablissementModel = require("../models/Etablissement");
exports.getEstablishment = async (req, res) => {
  try {
    const universityId = req.params.universityId;
    // Find establishments belonging to the selected university
    const establishments = await EtablissementModel.find({ idUni: universityId });
    res.json(establishments);
  } catch (error) {
    console.error("Error fetching establishments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

