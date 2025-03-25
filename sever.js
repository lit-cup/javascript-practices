const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware to parse JSON bodies (for saving files)
app.use(express.json());
// Serve static files (HTML, JS, etc.)
app.use(express.static('.'));

// Endpoint to list JS files in the folder
app.get('/api/files', async (req, res) => {
    try {
        const folderPath = path.join(__dirname, '../Basic/DataStructuresOperatorString');
        const files = await fs.readdir(folderPath);
        const jsFiles = files
            .filter(file => file.endsWith('.js'))
            .map(file => `../Basic/DataStructuresOperatorString/${file}`);
        res.json(jsFiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list files' });
    }
});

// Endpoint to save file contents
app.post('/api/save', async (req, res) => {
    try {
        const { filePath, content } = req.body;
        const fullPath = path.join(__dirname, filePath);
        await fs.writeFile(fullPath, content);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save file' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});