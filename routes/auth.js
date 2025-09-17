const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/teacherlogin", authController.teacherlogin);



// Teacher: after form submit -> load students and show table
router.post("/load-students", attendanceCtrl.loadStudents);

// Teacher: save attendance
router.post("/save", attendanceCtrl.saveAttendance);

// Parent: view attendance for a student (by student id or controlid)
router.get("/view/:student_id", attendanceCtrl.viewAttendance);

module.exports=router;