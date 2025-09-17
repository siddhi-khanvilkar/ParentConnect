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


// Show upload notice PDF form
router.get("/uploadnoticepdf", (req, res) => {
  res.render("uploadnoticepdf");
});

// Show list of all notices
router.get("/uploadnotice", noticeController.viewNotices);

module.exports=router;