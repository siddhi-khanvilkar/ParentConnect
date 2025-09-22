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
