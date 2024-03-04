const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./Controllers/userController");
const universityController = require("./Controllers/universityController");
const etablissementController = require("./Controllers/etablissementController");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/pfe");

const PORT = 3001;

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/login", universityController.getUniversities);
app.get("/Rect1", universityController.getEstablishmentsForUniversity);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
