const Semestre = require("../models/Semestre");

// Controller function to add a new semester
exports.addSemester = async (req, res) => {
  try {
    const { anneeId, startDate, endDate, semster } = req.body;

    // Check if the provided dates are valid
    if (!startDate || !endDate || endDate <= startDate) {
      return res.status(400).json({ error: "Invalid dates provided" });
    }

    // Create a new semester with the yearId as a foreign key
    const newSemester = new Semestre({
      anneeId: anneeId,
      startDate,
      endDate,
    });

    // Save the new semester to the database
    await newSemester.save();

    res.status(201).json(newSemester);
  } catch (error) {
    console.error("Error adding semester:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSemestre = async (req, res) => {
  const { anneeId } = req.params; // Extract yearId from request parameters
  try {
    // Assuming Semestre has a reference to Year model with a field named 'year'
    const semesters = await Semestre.find({ year: anneeId });
    if (semesters.length === 0) {
      return res
        .status(404)
        .json({ message: "No semesters found for the given yearId" });
    }
    res.json(semesters);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
