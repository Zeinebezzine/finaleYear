const coursModel = require("../models/Cours");
const ProfesseurModel = require("../models/Professeur");
const MatiereModel = require("../models/Matiere");
const ClasseModel = require("../models/Classe");

exports.ajoutCours = async (req, res) => {
  try {
    const {
      semestre,
      classId,
      matId,
      profId,
      nbr_h_C,
      nbr_grp_C,
      nbr_semaine_C,
      nbr_h_TD,
      nbr_grp_TD,
      nbr_semaine_TD,
      nbr_h_TP,
      nbr_grp_TP,
      nbr_semaine_TP,
      nbr_h_Cintg,
      nbr_grp_Cintg,
      nbr_semaine_Cintg,
    } = req.body;
    console.log(req.body);
    const coursExiste = await coursModel.findOne({
      profId,
      matId,
      classId,
      semestre,
      nbr_h_C,
      nbr_grp_C,
      nbr_semaine_C,
      nbr_h_TD,
      nbr_grp_TD,
      nbr_semaine_TD,
      nbr_h_TP,
      nbr_grp_TP,
      nbr_semaine_TP,
      nbr_h_Cintg,
      nbr_grp_Cintg,
      nbr_semaine_Cintg,
    });
    if (coursExiste) {
      return res.status(409).json({ message: "Cours existe déjà" });
    }
    // Find the prof by its ObjectId
    const foundProf = await ProfesseurModel.findById(profId);
    if (!foundProf) {
      return res.status(404).json({ message: "Prof non trouvé" });
    }
    // Find the subhject by its ObjectId
    const matiereExiste = await MatiereModel.findById(matId);
    if (!matiereExiste) {
      return res.status(404).json({ message: "Matiere non trouvé" });
    }
    const classExiste = await ClasseModel.findById(classId);
    if (!classExiste) {
      return res.status(404).json({ message: "Classe non trouvé" });
    }
    const newCours = new coursModel({
      semestre,
      nbr_h_C,
      nbr_grp_C,
      nbr_semaine_C,
      nbr_h_TD,
      nbr_grp_TD,
      nbr_semaine_TD,
      nbr_h_TP,
      nbr_grp_TP,
      nbr_semaine_TP,
      nbr_h_Cintg,
      nbr_grp_Cintg,
      nbr_semaine_Cintg,
      matId: matiereExiste._id,
      profId: foundProf._id,
      classId: classExiste._id,
    });
    await newCours.save();
    res.status(201).json({ message: "Cours ajouté avec succès" });
  } catch (error) {
    console.error("Erreur d'ajout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCourseByClassId = async (req, res) => {
  const classId = req.params.id;
  try {
    const courses = await coursModel.find({ classId });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//exporting
exports.exportExcelCourse = async (req, res) => {
  try {
    const courses = await coursModel
      .find()
      .populate("profId")
      .populate("matId")
      .populate("classId");

    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        const professor = await ProfesseurModel.findById(course.profId);
        const subject = await MatiereModel.findById(course.matId);
        const classData = await ClasseModel.findById(course.classId);

        return {
          Classe: classData
            ? `${classData.niveau} ${classData.type} ${classData.libelle}`
            : "",
          semestre: course.semestre,
          professorName: professor ? professor.nomComplet : "",
          MatierName: subject ? subject.nom_matiere : "",
          DepartmentName: classData ? classData.name : "",
          nbr_h_C: course.nbr_h_C,
          nbr_grp_C: course.nbr_grp_C,
          nbr_semaine_C: course.nbr_semaine_C,
          nbr_h_TD: course.nbr_h_TD,
          nbr_grp_TD: course.nbr_grp_TD,
          nbr_semaine_TD: course.nbr_semaine_TD,
          nbr_h_TP: course.nbr_h_TP,
          nbr_grp_TP: course.nbr_grp_TP,
          nbr_semaine_TP: course.nbr_semaine_TP,
          nbr_h_Cintg: course.nbr_h_Cintg,
          nbr_grp_Cintg: course.nbr_grp_Cintg,
          nbr_semaine_Cintg: course.nbr_semaine_Cintg,
        };
      })
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedCourses);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cours");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "courses.xlsx");
    res.status(200).send("Excel file generated and downloaded successfully!");
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCours = async (req, res) => {
  try {
    const courses = await coursModel.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: "Aucun cours" });
    }
    res.json(courses);
  } catch (error) {
    console.error("Erreur d'affichage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
