const db = require('../db'); // or wherever your MySQL connection is


exports.sendMessage = (req, res) => {
  const { parentName, studentName, message } = req.body;

  if (!parentName || !studentName || !message) {
    return res.status(400).send("All fields are required.");
  }

  const sql = "INSERT INTO messages (parent_name, student_name, message) VALUES (?, ?, ?)";
  db.query(sql, [parentName, studentName, message], (err, result) => {
    if (err) {
      console.error("Error saving message:", err);
      return res.status(500).send("Error saving message.");
    }

    res.send("Message sent successfully!");
  });
};
