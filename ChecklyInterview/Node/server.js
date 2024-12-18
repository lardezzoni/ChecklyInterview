const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static React build files
app.use(express.static(path.join(__dirname, '../React/checkly-interview/build')));

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

// Fallback route 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../React/checkly-interview/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});