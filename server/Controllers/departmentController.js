const DepartmentModel = require("../models/Departement");
const excel = require("exceljs");
exports.ajoutDepartemnt = async (req, res) => {
  try {
    const { nom } = req.body;
    const departementExist = await DepartmentModel.findOne({ nom });
    if (!departementExist) {
      // Department does not exist, proceed with creation
      const newDepartment = new DepartmentModel(req.body);
      await newDepartment.save();
      return res.status(201).json(newDepartment);
    } else {
      // Department already exists, return 409 status
      return res.status(409).json({ message: "Ce département existe déjà" });
    }
  } catch (error) {
    console.error("Erreur d'ajout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDepartement = async (req, res) => {
  try {
    const departements = await DepartmentModel.find();
    if (departements.length === 0) {
      return res.status(404).json({ message: "Aucun departement" });
    }
    res.json(departements);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDepartementById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await DepartmentModel.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const departmentID = req.params.id;
    const department = await DepartmentModel.findByIdAndDelete(departmentID);
    return res.status(200).json({ message: "Department deleted Successfully" });
  } catch (error) {
    console.error("error deleting department", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//export departments

exports.getDept = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    // Creating workspace = spreadsheet + sheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Départements");

    // Define columns
    worksheet.columns = [
      { header: "ID Département", key: "id", width: 30 },
      { header: "Libellé", key: "nom", width: 30 }
    ];

    // Add data to worksheet
    departments.forEach((department) => {
      worksheet.addRow({ id: department.id, nom: department.nom });
    });

    // Generate Excel file
    const filePath = "départements.xlsx";
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath);
  } catch (error) {
    console.error("Error exporting departments", error);
    res.status(500).json({ error: "Internal server error" });
  }
};