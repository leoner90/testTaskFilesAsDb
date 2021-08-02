var fs = require('fs');
const Students = require("../Students");
const studentDb = './app/models/repository/students.json';
const lastStudentId = './app/models/repository/id.json';
class RepositoryController {
    //GET ALL STUDENT LIST
    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(studentDb ,"utf8", function(err, data) {
                if(err){
                    return reject(err);
                } else {
                    const result = JSON.parse(data);
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
                    else {
                        console.log("There is no student with this id")
                    }
                }
                return  Students.getById(id,stringifyData);
            }
        });
        });  
    }

    //AddStudent
    addStudent(newStudentData){
        //Get old data
        fs.readFile(studentDb ,"utf8", function(err, data) { 
            if(data){
                console.log(444);
                const obj = JSON.parse(data); //now it an object 
            } else {
                console.log(123);
                const obj = [];
            }
           
           
            //Get last ID
            fs.readFile(lastStudentId ,"utf8", function(err, data) { 
                if (err) throw err;
                newStudentData.id = JSON.parse(data) + 1;
                const newId = JSON.stringify(newStudentData.id);
                obj.push(newStudentData);
                const stringifyData = JSON.stringify(obj, null, 2);
                fs.writeFile(studentDb ,stringifyData , function (err) {
                    if (err) throw err;
                    fs.writeFile(lastStudentId , newId, function (err) {
                        if (err) throw err;
                    });
                });   
            })     
        });
    }
    
    //DELETE STUDENT BY ID
    deleteStudent(id){
        console.log(id);
        //PROMISE GOES HERE //===
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
                    });
                }
            }
        });
    }
}
module.exports = new RepositoryController();