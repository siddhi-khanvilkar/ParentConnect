// const express = require("express");
// const router = express.Router();
// const attendanceCtrl = require("../controller/attendence");
  



// router.get("/",(req,res)=>{
//     res.render("index");
// });

// router.get("/register",(req,res) => {
//    res.render("register");
// });

// router.get("/login",(req,res) => {
//    res.render("login");
// });

// router.get("/profile",(req,res) => {
//    res.render("profile");
// });

// router.get("/teacherlogin",(req,res)=> {
//    res.render("teacherlogin")
// })

// router.get("/teacherDashboard",(req,res)=>{
//    res.render("teacherDashboard")
// })

// router.get("/uploadattendence",(req,res)=> {
//    res.render("uploadattendence")
// })
// router.get("/load-students", attendanceCtrl.loadStudents); // better as GET


// // Show upload notice form
// router.get('/uploadnotice', (req, res) => {
//     res.render('uploadnotice');  // this will render views/uploadnotice.hbs
// });

// router.get('/uploadtimetable', (req, res) => {
//     res.render('uploadtimetable');
// });

// router.get('/contactparent', (req, res) => {
//     res.render('contactparent');
// });

// // View attendance for parent
// router.get("/viewattendance", attendanceCtrl.viewAttendance);
// // res.render("profile", { parentName, student_id: parentStudentId });

// router.get("/profile", (req, res) => {
//   // Assuming you store parent info in session after login
//   const parentName = req.session.parentName;  
//   const parentStudentId = req.session.student_id;  

//   res.render("profile", { parentName, student_id: parentStudentId });
// });
// // After successful parent login
// req.session.parentName = parentNameFromDB;
// req.session.student_id = studentIdFromDB;
// res.redirect("/profile");









// module.exports=router;

// const express = require("express");
// const router = express.Router();
// const attendanceCtrl = require("../controller/attendence");

// router.get("/", (req, res) => res.render("index"));
// router.get("/register", (req, res) => res.render("register"));
// router.get("/login", (req, res) => res.render("login"));
// router.get("/teacherlogin", (req, res) => res.render("teacherlogin"));
// router.get("/teacherDashboard", (req, res) => res.render("teacherDashboard"));
// router.get("/uploadattendence", (req, res) => res.render("uploadattendence"));
// router.get("/load-students", attendanceCtrl.loadStudents);
 
// router.get("/uploadnotice", (req, res) => res.render("uploadnotice"));
// router.get("/uploadtimetable", (req, res) => res.render("uploadtimetable"));
// router.get("/contactparent", (req, res) => res.render("contactparent"));
// router.get("/viewattendance", attendanceCtrl.viewattendance);

// // Profile route - uses session data set during login
// router.get("/profile", (req, res) => {
//   const parentName = req.session.parentName;
//   const parentStudentId = req.session.student_id;
//   res.render("profile", { parentName, student_id: parentStudentId });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");
const multer = require('multer');
const noticeController = require('../controller/notice');
const timetableController = require('../controller/timetable');
const messageController = require('../controller/message');
// Use memoryStorage to access buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Static views
router.get("/", (req, res) => res.render("index"));
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.get("/teacherlogin", (req, res) => res.render("teacherlogin"));
router.get("/teacherDashboard", (req, res) => res.render("teacherDashboard"));
router.get("/uploadattendence", (req, res) => res.render("uploadattendence"));
router.get("/uploadnotice", (req, res) => res.render("uploadnotice"));
// router.get("/uploadtimetable", (req, res) => res.render("uploadtimetable"));
router.get("/contactparent", (req, res) => res.render("contactparent"));


// Data routes
router.get("/loadStudents", attendanceCtrl.loadStudents);
router.get("/viewattendence", attendanceCtrl.viewAttendance); // Fixed capital A
router.post("/uploadattendence", attendanceCtrl.saveAttendance);
router.post('/uploadnotice', upload.single('noticePDF'), noticeController.uploadnotice);
router.get("/viewtimetable", timetableController.viewTimetable);



router.get("/uploadtimetable", (req, res) => res.render("uploadtimetable"));

router.post('/uploadtimetable', upload.single('timetablePDF'), timetableController.uploadTimetable);
// 📄 Notice Routes
router.get("/viewnotice", noticeController.getNotices);          // List of notices
router.get("/notice/:id", noticeController.getNoticeById);      // Single notice

// 📩 Contact Parent Messaging Routes

// POST: Teacher sends a message to a parent
router.post('/sendmessage', messageController.sendMessage);

// GET: Parent views all messages sent to them
router.get('/viewmessages/:parentName', messageController.getMessagesByParent);


// Profile route with session data
router.get("/profile", (req, res) => {
  const parentName = req.session.parentName;
  const parentStudentId = req.session.student_id;
  res.render("profile", { parentName, student_id: parentStudentId });
});

module.exports = router;

