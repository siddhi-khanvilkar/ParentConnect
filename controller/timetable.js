const path = require('path');
const fs = require('fs');

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

    // Use className and date in file name to avoid clashes
    const fileName = `${className}_${date}_${Date.now()}_${timetablePDF.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the PDF file
    fs.writeFileSync(filePath, timetablePDF.buffer);

    // TODO: Save metadata (className, date, filename) to DB if needed

    res.send('Timetable uploaded successfully.');
};
