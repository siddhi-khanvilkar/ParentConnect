const express = require("express");
const router = express.Router();

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

router.get("/uploadnotices", (req, res) => {
    res.render("uploadnotices");
});

router.get("/uploadtimetable", (req, res) => {
    res.render("uploadtimetable");
});

router.get("/contactParent", (req, res) => {
    res.render("contactParent");
});

module.exports=router;