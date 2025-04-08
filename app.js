const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage });

// Serve the static files (e.g., HTML, JS)
app.use(express.static('public'));

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    res.send({ fileUrl }); // Send the file link as the response
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
