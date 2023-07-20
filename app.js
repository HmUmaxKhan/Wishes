//jshint esversion:6
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// mongoose.connect('mongodb://127.0.0.1:27017/secretsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String
// });

// const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
})



app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/secrets", (req, res) => {
    res.render("secrets");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/submit", (req, res) => {
    res.render("submit");
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})