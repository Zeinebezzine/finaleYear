const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./Middleware/authMiddleware");

const userController = require("./Controllers/userController");
const universityController = require("./Controllers/universityController");
const etablissementController = require("./Controllers/etablissementController");
const directorController = require("./Controllers/directorController");
const agentController = require("./Controllers/agentController");
const Rect2Controller = require("./Controllers/Rect2Controller");

const profController = require("./Controllers/profController");

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

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/universities", universityController.getUniversities);
app.get(
  "/establishments/:universityId",
  etablissementController.getEstablishment
);
app.get("/etablissement", etablissementController.getEstablishment);
app.post(
  "/Rect1/directors",
  middleware.authMiddleware,
  directorController.ajoutDirecteur
);
app.get("/Rect1/directors", directorController.getDirectors);
app.put("/directors/:id", directorController.updateDirector);
app.post("/Rect2", Rect2Controller.ajoutRect2);
app.get("/Rect2", Rect2Controller.getRect2);
app.post("/agent", agentController.ajoutAgent);
app.get("/agent", agentController.getAgents);
app.put("/agent/:id", agentController.updateAgent);

//les profs
app.post("/prof", profController.ajoutProf);
app.get("/prof", profController.getProf);
app.put("/prof/:id", profController.updateProf);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//middleware.authMiddleware,
