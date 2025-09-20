const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");
const noticeController = require("../controller/notice");
const multer = require("multer");
const path = require("path");
// Multer config: store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });






router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/teacherlogin", authController.teacherlogin);



// Teacher: after form submit -> load students and show table
router.post("/load-students", attendanceCtrl.loadStudents);

// Teacher: save attendance
router.post("/save", attendanceCtrl.saveAttendance);



// Multer setup for storing PDF files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/notices");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload notice route (POST)

router.post("/uploadnoticepdf", upload.single("file"), noticeController.uploadNotice); // Upload PDF


module.exports=router;