const EtablissementModel = require("../models/Etablissement");
exports.getEstablishment = async (req, res) => {
  try {
    const universityId = req.params.universityId;
    // Find establishments belonging to the selected university
    const establishments = await EtablissementModel.find({
      idUni: universityId,
    });
    res.json(establishments);
  } catch (error) {
    console.error("Error fetching establishments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEstablishment = (req, res) => {
  const id = "65ca29c6036cbf67a02b7fa4"; //  university id

  EtablissementModel.find({ idUni: id })
    .then((establishments) => {
      
      if (establishments.length === 0) {
        // Check if establishments array is empty
        return res
          .status(404)
          .json({ error: "Establishments not found for this university" });
      }
      res.json(establishments); // Send establishments array as response
    })
    .catch((error) => {
      console.error("Error fetching establishments:", error); // Corrected log message
      res.status(500).json({ error: "Internal server error" });
    });
};
