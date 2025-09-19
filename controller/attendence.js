const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

// Controller function to load students
exports.loadStudents = (req, res) => {
    const sql = `
        SELECT student_id, student_name AS name, roll_no AS rollno, class 
        FROM students
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send("Database error");
        }

        // Send results to the frontend or render the page
        res.render("uploadattendence", { students: results });
    });
};



exports.saveAttendance = (req, res) => {
  const { month, year, working_days, attendance } = req.body;
  
  // Convert attendance object into array for bulk insert
  const attendanceData = Object.entries(attendance).map(([student_id, present_days]) => [
    student_id, month, year, working_days, present_days
  ]);

  const sql = "INSERT INTO attendance (student_id, month, year, working_days, present_days) VALUES ?";
  
  db.query(sql, [attendanceData], (err, result) => {
    if (err) {
      console.error("Error saving attendance:", err);
      return res.send("Error saving attendance");
    }
    res.send("Attendance saved successfully!");
  });
};



