const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./Controllers/userController");
const universityController = require("./Controllers/universityController");
//const universityController = require("./Controllers/universityController");
const directorController = require("./Controllers/directorController");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/pfe");

const PORT = 3001;

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/universities", universityController.getUniversities);
app.get("/etablissement", universityController.getEstablishmentsForUniversity);
app.post("/Rect1/directors", directorController.ajoutDirecteur);
app.get("/Rect1/directors", directorController.getDirectors);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
