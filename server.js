//Libraries
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//controllers
const StudentsController = require("./app/controllers/StudentsController");
const StudentsCtrl = new StudentsController();
//Base server setup
const server = express();
server.set("view engine", "ejs"); // set templating engine
server.set("views", path.resolve(__dirname, "app/views"));// change default location of templating engine views
server.use(express.static(path.resolve(__dirname, "assets")));// us of main css in assets
server.use(bodyParser.urlencoded({ extended: false }));// used to parse req.body for POST,PUT requests

//NAVIGATION and controller call
// GET pages
server.get("/", function (req, res) {
  res.render("pages/index", { content: "This is home" });  // res.send("Home");
});
server.get("/students/create", StudentsCtrl.addStudentForm);
server.get("/students/:studentId?", StudentsCtrl.main); // ? if isset studentid
//Post Pages
server.post("/students/create", StudentsCtrl.createStudent);
server.post("/students/delete", StudentsCtrl.deleteStudent);
//Error page
server.use("*", function (req, res) {
  res.render("pages/error");
});

// start server listener
const port = 3001;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});