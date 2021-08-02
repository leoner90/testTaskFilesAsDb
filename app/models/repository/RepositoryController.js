var fs = require('fs');
const Students = require("../Students");
const studentDb = './app/models/repository/students.json';
const lastStudentId = './app/models/repository/id.json';
const NodeCache = require('node-cache')
const myCache = new NodeCache()

class RepositoryController {
  //GET ALL STUDENT LIST
  getAll() {
    return new Promise((resolve, reject) => {
      const value = myCache.get( "getAll" );
      if ( value != undefined ){   
        return resolve(Students.getAll(value));
      }
      fs.readFile(studentDb ,"utf8", function(err, data) {
        if(err){
            return reject(err);
        } else {
            if(!data){
              return resolve('error');
            }
            const result = JSON.parse(data);
            const success = myCache.set( "getAll", result, 10000 );
            //Model logic               
            return resolve(Students.getAll(result));
        }
      });
    });      
  }

  //GET SPECIFIC STUDENT
  getById(id) { 
    return new Promise((resolve, reject) => {
    fs.readFile(studentDb,"utf8", function(err, data) {
      if(err){
          return reject(err);
      } else {
          const stringifyData = JSON.parse(data);
          for(let i = 0 ; i < stringifyData.length ; i++){
              if(stringifyData[i].id == id){
                  return resolve(Students.getById(stringifyData[i]));
              }
          }
        return  Students.getById(id,stringifyData);
      }
    });
      });  
  }

  //AddStudent
  addStudent(newStudentData){
    addNewStudent();

    //Add new Student
    async function addNewStudent(){
      const oldData = await GetOldStudentData();
      const NewId = await GetLastID();
      newStudentData.id = NewId;
      const NewIdserealized = JSON.stringify(NewId);
      oldData.push(newStudentData);
      const stringifyData = JSON.stringify(oldData, null, 2);
      fs.writeFile(studentDb ,stringifyData , function (err) {
        if (err) throw err;
        fs.writeFile(lastStudentId , NewIdserealized, function (err) {
            if (err) throw err;
        });
      });   
    }
    //Get old data
    async function GetOldStudentData(){
      return new Promise((resolve, reject) => {
        fs.readFile(studentDb ,"utf8", function(err, data) { 
            if(data){
                const obj = JSON.parse(data);
                return resolve(obj); 
            } else {
                const obj = [];
                return resolve(obj);
            }
        })
      })
    }

    //Get last ID + 1
    async function GetLastID(){
      return new Promise((resolve, reject) => {
        fs.readFile(lastStudentId ,"utf8", function(err, data) { 
          if (err) throw err;
          const newId = JSON.parse(data) + 1;
          return resolve(newId);
        })
      })
    }
  }
  
  //DELETE STUDENT BY ID
  deleteStudent(id){
    //PROMISE GOES HERE //===
    return new Promise((resolve, reject) => {
      fs.readFile(studentDb ,"utf8", function(err, data) {
        if(err) {
            return reject(err);
        } else {
            const result = JSON.parse(data);
            var index = result.findIndex(a=> a.id == id);
            if (index > -1) {
              result.splice(index, 1);
              const stringifyData = JSON.stringify(result);
              fs.writeFile(studentDb , stringifyData , function (err) {
                if (err) throw err;
                return resolve("True")
              });
            }
        }
      });
    })
  }
}
module.exports = new RepositoryController();