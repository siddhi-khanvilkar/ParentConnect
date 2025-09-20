const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");
const noticeController = require("../controller/notice");
const path = require("path");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/teacherlogin", authController.teacherlogin);



// Teacher: after form submit -> load students and show table
router.post("/load-students", attendanceCtrl.loadStudents);

// Teacher: save attendance
router.post("/save", attendanceCtrl.saveAttendance);


// Handle notice upload
router.post('/uploadnotice', upload.single('noticePDF'), noticeController.uploadNotice);





module.exports=router;