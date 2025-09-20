const path = require('path');
const fs = require('fs');

// Notice upload handler
exports.uploadNotice = (req, res) => {
    const { title, date } = req.body;
    const noticePDF = req.file;

    if (!noticePDF) {
        return res.status(400).send('No file uploaded.');
    }

    // Create a folder if it doesn't exist
    const uploadDir = path.join(__dirname, '../public/uploads/notices');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(uploadDir, noticePDF.originalname);

    // Move the file to the destination
    fs.writeFileSync(filePath, noticePDF.buffer);

    // ✅ Save metadata to database if needed (not implemented here)
    // e.g., INSERT INTO notices (title, date, filename) VALUES (...)

    res.send('Notice uploaded successfully.');
};
