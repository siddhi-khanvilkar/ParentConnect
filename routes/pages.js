const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");



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

router.get("/uploadattendence",(req,res)=> {
   res.render("uploadattendence")
})


// Show upload notice form
router.get('/uploadnotice', (req, res) => {
    res.render('uploadnotice');  // this will render views/uploadnotice.hbs
});





module.exports=router;