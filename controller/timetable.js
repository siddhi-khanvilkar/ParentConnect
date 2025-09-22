// const path = require('path');
// const fs = require('fs');

// exports.uploadTimetable = (req, res) => {
//     const { class: className, date } = req.body;
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send('No file uploaded.');
//     }

//     // Ensure upload directory exists
//     const uploadDir = path.join(__dirname, '../public/uploads/timetables');
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Use className and date in file name to avoid clashes
//     const fileName = `${className}_${date}_${Date.now()}_${timetablePDF.originalname}`;
//     const filePath = path.join(uploadDir, fileName);

//     // Save the PDF file
//     fs.writeFileSync(filePath, timetablePDF.buffer);

//     // TODO: Save metadata (className, date, filename) to DB if needed

//     res.send('Timetable uploaded successfully.');
// };


const path = require('path');
const fs = require('fs');
const db = require('../db'); // <-- Make sure this is included
const timetableController = require('../controller/timetable'); 

exports.uploadTimetable = (req, res) => {
    const { class: className, date } = req.body;
    const timetablePDF = req.file;

    if (!timetablePDF) {
        return res.status(400).send('No file uploaded.');
    }

    // Ensure upload directory exists
    const uploadDir = path.join(__dirname, '../public/uploads/timetables');
  

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Unique file name using className, date, timestamp
    const fileName = `${className}_${date}_${Date.now()}_${timetablePDF.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the PDF file to disk
    fs.writeFileSync(filePath, timetablePDF.buffer);

    // ✅ Save to database
    const sql = `INSERT INTO timetables (class, date, filename) VALUES (?, ?, ?)`;
    const values = [className, date, fileName];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            return res.status(500).send('Error saving timetable to database.');
        }

        console.log('Timetable saved to database with ID:', result.insertId);
        res.send('Timetable uploaded and saved successfully.');
    });
};

// const db = require('../db');

exports.viewTimetable = (req, res) => {
    const studentId = req.session.student_id;

    if (!studentId) {
        return res.status(401).send("Unauthorized. Please log in.");
    }

    // Step 1: Get class of the logged-in parent’s child
    const getClassQuery = `SELECT class FROM students WHERE student_id = ?`;

    db.query(getClassQuery, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching class for student:", err);
            return res.status(500).send("Internal server error.");
        }

        if (results.length === 0) {
            return res.status(404).send("Student not found.");
        }

        const studentClass = results[0].class;

        // Step 2: Get all timetables for that class
        const getTimetablesQuery = `
            SELECT class, date, filename
            FROM timetables
            WHERE class = ?
            ORDER BY date DESC
        `;

        db.query(getTimetablesQuery, [studentClass], (err, timetables) => {
            if (err) {
                console.error("Error fetching timetables:", err);
                return res.status(500).send("Failed to load timetables.");
            }

            res.render("viewtimetable", {
                studentClass,
                timetables
            });
        });
    });
};

