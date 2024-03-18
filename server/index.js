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
app.use(
  cookieParser({
    origins: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
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
app.get(
  "/etablissement",
  etablissementController.getEstablishment
);
app.post(
  "/Rect1/directors",
  middleware.authMiddleware,
  directorController.ajoutDirecteur
);
app.get("/Rect1/directors", directorController.getDirectors);
app.put("/directors/:id", directorController.updateDirector);
app.post("/pedagogique", pedagogiqueController.ajoutPedagogique);
app.post("/financier", financierController.ajoutFinancier);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//middleware.authMiddleware,
