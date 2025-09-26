// const db = require('../db');

// exports.sendMessage = (req, res) => {
//   const { parentName, studentName, message } = req.body;
//   console.log("sendMessage: received form data ->", req.body);

//   const sql = 'INSERT INTO messages (parent_name, student_name, message) VALUES (?, ?, ?)';
//   db.query(sql, [parentName, studentName, message], (err, result) => {
//     if (err) {
//       console.error("sendMessage: DB error ->", err);
//       return res.status(500).send("Internal Server Error: " + err.message);
//     }
//     console.log("sendMessage: message inserted, result ->", result);
//     res.redirect('/teacherDashboard');
//   });
// };


// //final
const db = require('../db');

// Parent sends a message to teacher
exports.sendMessageParent = (req, res) => {
  const { parentName, studentName, message } = req.body;
  const sql = 'INSERT INTO messages (parent_name, student_name, message, sender) VALUES (?, ?, ?, "parent")';
  db.query(sql, [parentName, studentName, message], (err) => {
    if (err) {
      console.error("sendMessageParent error:", err);
      return res.status(500).send("Error sending message");
    }
    res.redirect('/contactmentor');
  });
};

// Teacher sends a message to a parent
exports.sendMessageTeacher = (req, res) => {
  const { parentName, studentName, message } = req.body;
  const sql = 'INSERT INTO messages (parent_name, student_name, message, sender) VALUES (?, ?, ?, "teacher")';
  db.query(sql, [parentName, studentName, message], (err) => {
    if (err) {
      console.error("sendMessageTeacher error:", err);
      return res.status(500).send("Error sending message");
    }
    res.redirect('/contactparent');
  });
};

// Parent view: show conversation with teacher
exports.contactMentorPage = (req, res) => {
  const parentName = req.session.parentName;
  const student_id = req.session.student_id;

  const sql = 'SELECT * FROM messages WHERE parent_name = ? ORDER BY created_at ASC';
  db.query(sql, [parentName], (err, results) => {
    if (err) {
      console.error("contactMentorPage error:", err);
      return res.status(500).send("Error loading messages");
    }
    res.render('contactmentor', { parentName, student_id, messages: results });
  });
};

// Teacher view: show all conversations (grouped by parent)
exports.contactParentPage = (req, res) => {
  const sql = 'SELECT * FROM messages ORDER BY created_at ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error("contactParentPage error:", err);
      return res.status(500).send("Error loading messages");
    }
    res.render('contactparent', { messages: results });
  });
};
