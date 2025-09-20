// const db = require("../db");

// // Save uploaded notice in DB
// exports.uploadNotice = (req, res) => {
//   const { title } = req.body;
//   const file_path = req.file.filename; // safer for production

//   const sql = "INSERT INTO notices (title, upload_date, file_path) VALUES (?, NOW(), ?)";
//   db.query(sql, [title, file_path], (err) => {
//     if (err) {
//       console.error("Error saving notice:", err);
//       return res.status(500).send("Database error");
//     }
//     res.redirect("/uploadnotice"); // redirect to list page
//   });
// };

// // Display all notices
// exports.viewNotices = (req, res) => {
//   const sql = "SELECT * FROM notices ORDER BY upload_date DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching notices:", err);
//       return res.status(500).send("Database error");
//     }
//     res.render("uploadnotice", { notices: results });
//   });
// };


const db = require("../db"); // Your DB connection

// Save uploaded notice in DB
exports.uploadNotice = (req, res) => {
  const { title } = req.body;
  const file_path = req.file ? req.file.filename : null;

  if (!title || !file_path) {
    return res.status(400).send("Title and file are required!");
  }

  const sql = "INSERT INTO notices (title, upload_date, file_path) VALUES (?, NOW(), ?)";
  db.query(sql, [title, file_path], (err) => {
    if (err) {
      console.error("Error saving notice:", err);
      return res.status(500).send("Database error");
    }
    res.redirect("/uploadnotice");
  });
};

// Display all notices
exports.viewNotices = (req, res) => {
  const sql = "SELECT * FROM notices ORDER BY upload_date DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching notices:", err);
      return res.status(500).send("Database error");
    }
    res.render("uploadnotice", { notices: results });
  });
};
