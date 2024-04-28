const ProfesseurModel = require("../models/Professeur");
const UserModel = require("../models/Utilisateur");
const DepartementModel = require("../models/Departement");
const ProfSemesterModel = require("../models/ProfSemester");
const xlsx = require("xlsx");

exports.ajoutProf = async (req, res) => {
  try {
    const {
      nomComplet,
      nomComplet_arabe,
      email,
      CIN,
      RIB,
      tel,
      grade,
      statut,
      DDO,
      // dueCours,
      // dueTD,
      // dueTP,
      establishmentId,
      departmentId,
    } = req.body;

    console.log("Request Body:", req.body);

    // Check if a professor with the same email already exists
    const profExist = await ProfesseurModel.findOne({ email });
    if (profExist) {
      return res.status(409).json({ message: "Enseignant existe déjà" });
    }

    // Create a new ProfesseurModel instance
    const newProf = new ProfesseurModel({
      nomComplet,
      nomComplet_arabe,
      email,
      CIN,
      RIB,
      tel,
      grade,
      statut,
      DDO,
      // dueCours,
      // dueTD,
      // dueTP,
      establishmentId,
      // agentId,
      departmentId,
    });

    // Save the new professor
    await newProf.save();
    res.status(201).json({ message: "Professeur ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout:", error);
    res.status(500).json({ message: "Erreur d'ajout" });
  }
};

//prof/semester
exports.addHoursPerSemester = async (req, res) => {
  try {
    const { professorId, semesterId, dueCours, dueTD, dueTP, dueCintg } =
      req.body;

    // Check if a record already exists with the same professorId and semesterId
    const existingProfSemester = await ProfSemesterModel.findOne({
      professorId,
      semesterId,
    });

    if (existingProfSemester) {
      return res.status(400).json({
        message: "A record with the same professor and semester already exists",
      });
    }

    // Create a new ProfSemesterModel instance
    const newProfSemester = new ProfSemesterModel({
      professorId,
      semesterId,
      dueCours,
      dueTD,
      dueTP,
      dueCintg,
    });

    // Save the new ProfSemester record
    await newProfSemester.save();
    res
      .status(201)
      .json({ message: "Heures ajoutées avec succès pour ce semestre" });
  } catch (error) {
    console.error("Erreur d'ajout d'heures pour ce semestre:", error);
    res
      .status(500)
      .json({ message: "Erreur d'ajout d'heures pour ce semestre" });
  }
};

exports.getProf = async (req, res) => {
  try {
    const professors = await ProfesseurModel.find();
    if (professors.length === 0) {
      return res.status(404).json({ message: "Aucun prof trouvé" });
    }
    res.json(professors);
  } catch (error) {
    console.error("Error fetching professors data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProf = async (req, res) => {
  try {
    const profId = req.params.id;
    const updatedRecord = req.body;
    const updatedProf = await ProfesseurModel.findByIdAndUpdate(
      profId,
      updatedRecord,
      { new: true }
    );
    res.json(updatedProf);
  } catch (error) {
    console.error("Error updating professor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProf = async (req, res) => {
  try {
    const profId = req.params.id;
    const deletedProf = await ProfesseurModel.findByIdAndDelete(profId);
    if (!deletedProf) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json({ message: "Professor deleted successfully!" });
  } catch (error) {
    console.error("Error deleting prof", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getPedagogiue = async (req, res) => {
//   try {
//     const agent = await UserModel.find({
//       role: { $in: [ "pedagogique"] },
//     });
//     if (!agent) {
//       return res.status(404).json({ message: " data not found" });
//     }
//     res.json(agent);
//   } catch (error) {
//     console.error("Error fetching  data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//upload excel files and save in database
exports.uploadFileAndSaveData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the uploaded Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save the data to the database
    await ProfesseurModel.insertMany(excelData);

    return res
      .status(200)
      .json({ message: "File uploaded and data saved successfully" });
  } catch (error) {
    console.error("Error uploading file", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//getProf by Id
exports.getProfById = async (req, res) => {
  const profId = req.params.id;
  const prof = await ProfesseurModel.findById(profId);
  res.json(prof);
};

exports.getProfSemeseterById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received professorId:", id);

    const profSemesters = await ProfSemesterModel.find({ professorId: id });

    if (!profSemesters || profSemesters.length === 0) {
      return res.status(404).json({
        message: "No ProfSemesters found for the provided professorId",
      });
    }

    res.json(profSemesters);
  } catch (error) {
    console.error("Error fetching ProfSemesters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
