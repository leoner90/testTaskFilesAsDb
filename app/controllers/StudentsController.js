//modules require
const Students = require("../models/Students");
const test = require("../models/test");

// Main Controller-  for students list , individual student page , delete , and insert students
class StudentsController {
  async main(req, res) {
    const { studentId } = req.params;
    if (studentId) {
      const student = await Students.getById(studentId);
      console.log(student);
      if (!student) {
        res.render("pages/error");
      } else {
        res.render("pages/student", { student });
      }
    } else {
      const students =  await Students.getAll();
      console.log(students);
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
      await Students.addStudent(req.body); //req.body it's a  form result if not empty,call module addStudent and add student to database
    }
  // return the same form page , after student inserting
    const students = await Students.getAll();
    res.render("pages/students", { students });
  }

  //Delete Student
  async deleteStudent(req, res) {
    test.writeLog('before deleting');
    let studentId = req.body['btn']
    await Students.deleteStudent(studentId);
    
    // relocates to all students page after deleting
    const students = await Students.getAll();
    res.render("pages/students", { students });
  }
}

module.exports = StudentsController;