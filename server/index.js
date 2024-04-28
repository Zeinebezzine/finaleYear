const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./Middleware/authMiddleware");
// Multer setup for file upload
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const yearController = require("./Controllers/yearController");
const semesterController = require("./Controllers/semesterController");

const userController = require("./Controllers/userController");
const universityController = require("./Controllers/universityController");
const etablissementController = require("./Controllers/etablissementController");
const directorController = require("./Controllers/directorController");
const agentController = require("./Controllers/agentController");
const Rect2Controller = require("./Controllers/Rect2Controller");

const profController = require("./Controllers/profController");
const matiereController = require("./Controllers/matierController");

const classeController = require("./Controllers/classeController");
const coursController = require("./Controllers/coursController");

const departementController = require("./Controllers/departmentController");

const MatClassController = require("./Controllers/MatClassController");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cookieParser({
    origins: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/pfe");
const PORT = 3001;

app.post("/annee", yearController.addAnnee);
app.get("/annee", yearController.getA);
app.post("/semester", semesterController.addSemester);
app.get("/semestre/:id", semesterController.getSemestre);
app.post("/login", userController.login);
app.get("/universities", universityController.getUniversities);
app.get(
  "/establishments/:universityId",
  etablissementController.getEstablishment
);

app.get("/etablissement", etablissementController.getEstablishment);
app.post(
  "/Rect1/directors",
  //middleware.authMiddleware,
  directorController.ajoutDirecteur
);

app.get("/etablissement/:id", etablissementController.getEstById);
app.get("/university/:id", universityController.getUniById);
app.get("/Rect1/directors", directorController.getDirectors);
app.put("/directors/:id", directorController.updateDirector);
app.post("/Rect2", Rect2Controller.ajoutRect2);
app.get("/Rect2", Rect2Controller.getRect2);
app.post("/agent", agentController.ajoutAgent);
app.get("/agent", agentController.getAgents);
app.put("/agent/:id", agentController.updateAgent);
//app.get("/agent/Pedagogiue", agentController.getPedagogiue);

//les profs
app.post("/prof", profController.ajoutProf);
app.get("/prof", profController.getProf);
app.post("/prof/addHoursPerSemester", profController.addHoursPerSemester);
app.get(
  "/prof/getProfSemestersByProfessorId/:professorId",
  profController.getProfSemeseterById
);
app.get("/prof/:id", profController.getProfById);
app.put("/prof/:id", profController.updateProf);
app.delete("/prof/:id", profController.deleteProf);
app.post(
  "/prof/upload",
  upload.single("excelFile"),
  profController.uploadFileAndSaveData
);

//les matieres
app.post("/matiere", matiereController.ajoutMatiere);
app.get("/matiere", matiereController.getmatiere);
app.get("/matiere/:id", matiereController.getMatierById);
app.delete("/matiere/:id", matiereController.deleteMatiere);

app.post("/classe", classeController.ajoutClasse);
app.get("/classe", classeController.getClasses);
app.delete("/classe/:id", classeController.deleteClasse);
app.get("/classeName/:id", classeController.getClassById);
//cours
app.post("/cours", coursController.ajoutCours);
//app.get("/cours/:id", coursController.getCourseById);
app.get("/cours/:id", coursController.getCourseByClassId);
app.get("/export-excel", coursController.exportExcelCourse);
app.get("/cours", coursController.getCours);

//departments
app.post("/departement", departementController.ajoutDepartemnt);
app.get("/departement", departementController.getDepartement);
app.get("/export/department", departementController.getDept);
app.get("/departement/:id", departementController.getDepartementById);
app.delete("/departement/:id", departementController.deleteDepartment);

app.post("/matierClasse", MatClassController.ajoutMatClass);
app.get("/getMatierClassById/:id", MatClassController.getMatierClassById);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//middleware.authMiddleware,
