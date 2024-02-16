const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");
const UniversityModel = require("./models/Universités");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/pfe");
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Connected to MongoDB");
// })
// .catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });
const PORT = 3001;
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  RegisterModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already exist");
    } else {
      RegisterModel.create(req.body)
        .then((result) => res.json("account created"))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  // To find record from the database
  const { email, password } = req.body;
  RegisterModel.findOne({ email: email }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    }
    // If user not found then
    else {
      res.json("No records found! ");
    }
  });
});

//get Universities from DB
app.get("/universités  ", (req, res) => {
  UniversityModel.find()
    .then((universities) => res.json(universities))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
