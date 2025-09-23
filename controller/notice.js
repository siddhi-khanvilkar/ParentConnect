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

// const path = require('path');
// const fs = require('fs');

// exports.uploadnotice = (req, res) => {
//     try {
//         const { title, date } = req.body;
//         const noticePDF = req.file;

//         if (!noticePDF) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const uploadDir = path.join(__dirname, '../public/uploads/notices');

//         // Ensure directory exists
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         const filePath = path.join(uploadDir, noticePDF.originalname);

//         // Save the file buffer to the disk
//         fs.writeFileSync(filePath, noticePDF.buffer);

//         console.log(`Uploaded: ${noticePDF.originalname}`);

//         res.send('Notice uploaded successfully.');
//         // Or redirect: res.redirect('/uploadnotice');
//     } catch (err) {
//         console.error('Upload failed:', err);
//         res.status(500).send('Server error during upload.');
//     }
// };


const path = require('path');
const fs = require('fs');
const db = require('../db'); // <-- add this line

exports.uploadnotice = (req, res) => {
    try {
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

        // ✅ Insert into database
        const sql = 'INSERT INTO notices (title, date, filename) VALUES (?, ?, ?)';
        const values = [title, date, noticePDF.originalname];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database insert error:', err);
                return res.status(500).send('Error saving notice to database.');
            }

            console.log('Notice saved to database with ID:', result.insertId);
            res.send('Notice uploaded and saved to database.');
        });

    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).send('Server error during upload.');
    }
};
exports.getNotices = (req, res) => {
    const sql = "SELECT id, title, date, created_at FROM notices ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).send("Error fetching notices.");
        }
        res.render("viewnotice", { notices: results }); 
    });
};
exports.getNoticeById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM notices WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error("Notice fetch error:", err);
            return res.status(404).send("Notice not found.");
        }

        const notice = results[0];
        const filePath = `/uploads/notices/${notice.filename}`;
        
        // Option 1: Render a page with an <embed> or link to open PDF
        res.render("singlenotice", { notice, filePath });

        // Option 2 (direct open PDF in browser):
        // res.redirect(filePath);
    });
};
