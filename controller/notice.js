const path = require('path');
const fs = require('fs');

// ✅ Notice upload handler
exports.uploadNotice = (req, res) => {
    const { title, date } = req.body;
    const noticePDF = req.file;

    if (!noticePDF) {
        return res.status(400).send('No file uploaded.');
    }

    const uploadDir = path.join(__dirname, '../public/uploads/notices');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, noticePDF.originalname);
    fs.writeFileSync(filePath, noticePDF.buffer);

    res.send('Notice uploaded successfully.');
};

