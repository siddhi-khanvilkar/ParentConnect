// const path = require('path');
// const fs = require('fs');

// // ✅ Notice upload handler
// exports.uploadnotice = (req, res) => {
//     const { title, date } = req.body;
//     const noticePDF = req.file;

//     if (!noticePDF) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const uploadDir = path.join(__dirname, '../public/uploads/notices');

//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const filePath = path.join(uploadDir, noticePDF.originalname);
//     fs.writeFileSync(filePath, noticePDF.buffer);

//     res.send('Notice uploaded successfully.');
// };

const path = require('path');
const fs = require('fs');

exports.uploadnotice = (req, res) => {
    try {
        const { title, date } = req.body;
        const noticePDF = req.file;

        if (!noticePDF) {
            return res.status(400).send('No file uploaded.');
        }

        const uploadDir = path.join(__dirname, '../public/uploads/notices');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, noticePDF.originalname);

        // Save the file buffer to the disk
        fs.writeFileSync(filePath, noticePDF.buffer);

        console.log(`Uploaded: ${noticePDF.originalname}`);

        res.send('Notice uploaded successfully.');
        // Or redirect: res.redirect('/uploadnotice');
    } catch (err) {
        console.error('Upload failed:', err);
        res.status(500).send('Server error during upload.');
    }
};


