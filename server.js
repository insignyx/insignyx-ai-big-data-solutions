const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();
const PORT = 8000;

// SEO: Redirect www to non-www for consistency
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const redirectUrl = `${req.protocol}://${req.headers.host.slice(4)}${req.url}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

// Apply security headers with helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://cdn.tailwindcss.com'],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com', "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
      },
    },
    // Allow inline styles which are used in the project
    crossOriginEmbedderPolicy: false,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  // Check if the request is for a specific file
  const filePath = path.join(__dirname, req.path);
  const isFile = req.path.includes('.');
  
  if (isFile) {
    res.sendFile(filePath, err => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  } else {
    // If no specific file is requested, default to index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// Start the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\x1b[32m✓\x1b[0m Server running securely at http://127.0.0.1:${PORT}`);
  console.log(`\x1b[36mi\x1b[0m Press Ctrl+C to stop the server`);
});