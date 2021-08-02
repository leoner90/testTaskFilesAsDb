// const StudentsController = require("../controllers/StudentsController");
class Students {
  getAll(allStudents) {
      for(let i = 0 ; i < allStudents.length ; i++){
        allStudents[i].name = allStudents[i].name + " The Best Business logic";
      }
      return allStudents;
  }

  getById(data){
      data.name = data.name  + " is the special student  ";
      return data;
    }

    deleteStudent(id){

    }
  }
  
  //EXPORT CLASS
  module.exports = new Students();