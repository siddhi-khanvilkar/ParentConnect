const express = require("express");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");
  



router.get("/",(req,res)=>{
    res.render("index");
});

router.get("/register",(req,res) => {
   res.render("register");
});

router.get("/login",(req,res) => {
   res.render("login");
});

router.get("/profile",(req,res) => {
   res.render("profile");
});

router.get("/teacherlogin",(req,res)=> {
   res.render("teacherlogin")
})

router.get("/teacherDashboard",(req,res)=>{
   res.render("teacherDashboard")
})

router.get("/uploadattendence",(req,res)=> {
   res.render("uploadattendence")
})
router.get("/load-students", attendanceCtrl.loadStudents); // better as GET


// Show upload notice form
router.get('/uploadnotice', (req, res) => {
    res.render('uploadnotice');  // this will render views/uploadnotice.hbs
});

router.get('/uploadtimetable', (req, res) => {
    res.render('uploadtimetable');
});

router.get('/contactparent', (req, res) => {
    res.render('contactparent');
});






module.exports=router;