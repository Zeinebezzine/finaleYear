const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./Middleware/authMiddleware");

const userController = require("./Controllers/userController");
const universityController = require("./Controllers/universityController");
const etablissementController = require("./Controllers/etablissementController");
const directorController = require("./Controllers/directorController");
const financierController = require("./Controllers/financierController");
const pedagogiqueController = require("./Controllers/pedagogiqueController");

const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/pfe");
const PORT = 3001;

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/universities", universityController.getUniversities);
app.get(
  "/establishments/:universityId",
  etablissementController.getEstablishment
);
app.get("/etablissement", universityController.getEstablishmentsForUniversity);
app.post(
  "/Rect1/directors",
  middleware.authMiddleware,
  directorController.ajoutDirecteur
);
app.get("/Rect1/directors", directorController.getDirectors);
app.put(
  "/directors/:id",
  middleware.authMiddleware,
  directorController.updateDirector
);
app.post(
  "/pedagogique",
  middleware.authMiddleware,
  pedagogiqueController.ajoutPedagogique
);
app.post(
  "/financier",
  middleware.authMiddleware,
  financierController.ajoutFinancier
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
