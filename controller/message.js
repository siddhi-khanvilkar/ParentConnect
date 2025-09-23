const db = require('../db');

// Controller: Save message to database
exports.sendMessage = async (req, res) => {
  const { parentName, studentName, message } = req.body;

  try {
    await db.execute(
      'INSERT INTO messages (parent_name, student_name, message) VALUES (?, ?, ?)',
      [parentName, studentName, message]
    );
    res.redirect('/teacherDashboard');
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Controller: Fetch messages for a specific parent
exports.getMessagesByParent = async (req, res) => {
  const { parentName } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM messages WHERE parent_name = ? ORDER BY timestamp DESC',
      [parentName]
    );
    res.render('viewmessages', {
      parentName,
      messages: rows
    });
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).send('Internal Server Error');
  }
};
