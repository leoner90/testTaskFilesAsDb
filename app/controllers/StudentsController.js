//modules require
//mysql2
const Students = require("../models/Students");
const RepositoryController = require("../models/repository/RepositoryController");
// Main Controller-  for students list , individual student page , delete , and insert students
class StudentsController {
  async main(req, res) {
    const { studentId } = req.params;
    if (studentId) {
      const student = await RepositoryController.getById(studentId);
      console.log(student);
      if (!student) {
        res.render("pages/error");
      } else {
        res.render("pages/student", { student });
      }
    } else {
      //TRY ,CATCH, BLOCK goes here :)
      const students =  await RepositoryController.getAll();
      res.render("pages/students", { students });
    }
  }

  // used for rendering create student form
  addStudentForm(req, res) {
      res.render("pages/addStudent");
  }

  // used for POST request from the form, and adding new student
  async createStudent(req, res) {
    if(req.body){
       RepositoryController.addStudent(req.body); //req.body it's a  form result if not empty,call module addStudent and add student to database
    }
    const students = await RepositoryController.getAll();
    res.render("pages/students", { students });
  }

  //Delete Student
  async deleteStudent(req, res) {
    let studentId = req.body['btn']
    await RepositoryController.deleteStudent(studentId);
    
    // relocates to all students page after deleting
    const students =  await RepositoryController.getAll();
    res.render("pages/students", { students });
  }
}

module.exports = StudentsController;