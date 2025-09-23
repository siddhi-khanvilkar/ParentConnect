const db = require('../db');

exports.sendMessage = (req, res) => {
  const { parentName, studentName, message } = req.body;
  console.log("sendMessage: received form data ->", req.body);

  const sql = 'INSERT INTO messages (parent_name, student_name, message) VALUES (?, ?, ?)';
  db.query(sql, [parentName, studentName, message], (err, result) => {
    if (err) {
      console.error("sendMessage: DB error ->", err);
      return res.status(500).send("Internal Server Error: " + err.message);
    }
    console.log("sendMessage: message inserted, result ->", result);
    res.redirect('/teacherDashboard');
  });
};
