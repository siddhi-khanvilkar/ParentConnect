// controller/message.js
const db = require('../db');

exports.sendMessage = async (req, res) => {
  const { parentName, studentName, message } = req.body;
  console.log('sendMessage: received form data ->', { parentName, studentName, message });

  if (!parentName || !studentName || !message) {
    // Missing some field
    return res.status(400).send('All fields are required');
  }

  try {
    const sql = 'INSERT INTO messages (parent_name, student_name, message) VALUES (?, ?, ?)';
    await db.execute(sql, [parentName, studentName, message]);
    console.log('sendMessage: insert successful');
    res.redirect('/teacherDashboard');
  } catch (err) {
    console.error('sendMessage: DB error ->', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
};

exports.getMessagesByParent = async (req, res) => {
  const { parentName } = req.params;
  console.log('getMessagesByParent: for parent ->', parentName);

  if (!parentName) {
    return res.status(400).send('Parent name required');
  }

  try {
    const sql = 'SELECT * FROM messages WHERE parent_name = ? ORDER BY timestamp DESC';
    const [rows] = await db.execute(sql, [parentName]);
    console.log('getMessagesByParent: fetched rows ->', rows.length);
    res.render('viewmessages', { parentName, messages: rows });
  } catch (err) {
    console.error('getMessagesByParent: DB error ->', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
};
