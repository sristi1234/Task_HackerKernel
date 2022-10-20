var express = require('express');
var path = require('path');
var router = express.Router();
var database = require('../model/database');
 var emailValid = require('email-validator');
 
 var fs = require('fs');

 var excel = require('exceljs')
user = require('../model/user');
task = require('../model/task');

// user.hasMany(task);

database.sync()
.then((result)=>{
  // console.log(result)
})
.catch((err)=>{
  console.log(err);
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});
router.get('/newUser', function(req, res, next) {
  res.render('user', { title: 'AddUser' });


});
router.get('/newTask', function(req, res, next) {
  
  user.findAll()
  .then((users)=>{
    res.render('task',  {users,  title: 'Task' });
  })
  .catch((err)=>{
    res.send(err);
  })      
  
});


router.post('/addUser', function(req,res, next)
{
      const {name , email, phone, } = req.body;
      
    if(emailValid.validate(email))
    {
      user.create({
        name, 
        email, 
        phone, 
       }).then(()=>{
        res.redirect('/');
       })
       .catch((err)=>{
        res.send(err);
       })
    
    }
    else{
      res.send("Email is invalid");
    }
         
})
router.post('/addTask', function(req,res, next)
{
  const  {username , name , taskTypes} = req.body;
  
    
  task.create({
    username ,
    name,
    taskTypes,

  }).then(()=>{
    res.redirect('/');
  })
  
        
})

router.get('/sheet', function(req, res, next) {
  user.findAll().then((user)=>{
   const workbook1 = new excel.Workbook();
   const workbook2 = new excel.Workbook();
   const worksheet1 = workbook1.addWorksheet('Users');
   const worksheet2 = workbook2.addWorksheet('tasks');
   worksheet1.columns = [
     {header:'S.no', key: 's_no', width:10 },
     {header:'Name', key: 'name' , width:10},
     {header:'Email', key: 'email' , width:10},
     {header:'Number', key: 'phone' , width:10},
    
   ];
   worksheet2.columns = [
     {header:'S.no', key: 's_no'},
     {header:'Username' , key: 'username'},
     {header:'TaskName', key: 'name'},
     {header:'type', key: 'taskTypes'},
     
   ];
 
   let count = 1;
   user.forEach((user)=>{
     user.s_no = count;
     worksheet1.addRow(user);
     count++;
     worksheet1.getRow(1).eachCell((cell)=>{
       cell.font = {bold:true};
       if(fs.existsSync( path.join(
        __dirname, ".." ,"users.xlsx"
      ))){
       fs.unlinkSync(
        path.join(
          __dirname, ".." ,"users.xlsx"
        )
       )
        }
       workbook1.xlsx.writeFile('users.xlsx').then((data)=>{
              res.redirect("/")
       }).catch((err)=>{
        console.log("user " + err)
       })
     })
   })
   count = 1;
   task.findAll().then((task)=>{
     task.forEach((task)=>{
       task.s_no = count;
       worksheet2.addRow(task);
       count++;
       worksheet2.getRow(1).eachCell((cell)=>{
         cell.font = {bold:true};
         if(fs.existsSync( path.join(
          __dirname, ".." ,"task.xlsx"
        ))){
         fs.unlinkSync(
          path.join(
            __dirname, ".." ,"task.xlsx"
          )
         )
          }
         workbook2.xlsx.writeFile('task.xlsx').then((data)=>{
           res.redirect("/")
         }).catch((err)=>{
          console.log("task " +err)
         })
       })
     })
   })
  
  })
 });





module.exports = router;
