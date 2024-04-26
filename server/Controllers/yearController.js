const Annee = require("../models/Annee");

exports.addAnnee = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Check if the provided dates are valid
    if (!startDate || !endDate || endDate <= startDate) {
      return res.status(400).json({ error: "Invalid dates provided" });
    }

    // Check if the year already exists
    const existingAnnee = await Annee.findOne({ startDate, endDate });
    if (existingAnnee) {
      return res.status(400).json({ error: "University year already exists" });
    }

    // Create a new university year
    const newAnnee = new Annee({
      startDate,
      endDate,
    });

    // Save the new university year to the database
    await newAnnee.save();

    res.status(201).json(newAnnee);
  } catch (error) {
    console.error("Error adding university year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getA = async (req, res) => {
  try {
    const annees = await Annee.find();
    if (annees.length === 0) {
      return res.status(404);
    }
    res.json(annees);
  } catch (error) {
    console.error("Erreur d'affichage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
