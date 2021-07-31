//MYSQL CONNECT
const db = require("../../mysql-connection");
class Students {
  constructor(db) {
    connection = this.db;
    util = require('util');
    // It is basically used to convert a method that returns responses using a callback function to return responses in a promise object. 
    query = this.util.promisify(connection.query).bind(connection);
  }
  //GET ALL STUDENT LIST
  getAll() {
    const rows = this.query("SELECT * FROM student"); // returns result as a promise object
    return rows;
  }

  //GET SPECIFIC STUDENT
  getById(id) { 
    const rows = this.query("SELECT * FROM student WHERE Id_Student="+id); // returns result as a promise object
    return rows;
  }

  //ADD NEW STUDENT
  addStudent(newStudentData){
    this.query(`INSERT INTO student (Name, Surname, Gender, Age , Id_faculty)  
    VALUES ('${newStudentData.name}', 'surname', '${newStudentData.gender}', ${newStudentData.age}, 2)`);
  }

  //DELETE STUDENT BY ID
  deleteStudent(id){
    this.query("DELETE FROM student WHERE Id_Student="+id);
  }
}

//EXPORT CLASS
module.exports = new Students();