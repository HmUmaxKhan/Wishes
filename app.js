//jshint esversion:6
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/secretsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = {
  email: String,
  password: String,
};

const Users = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new Users({
      email: req.body.email,
      password: hash,
    });

    newUser.save().catch((err) => {
      console.log(err);
    });
    res.redirect("/");
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secrets", (req, res) => {
  res.render("secrets");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          res.redirect("/secrets");
        });
      } else {
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/submit", (req, res) => {
  res.render("submit");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
