// Simple Node.js server alternative to avoid Norton warnings
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// Security headers to add to all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
};

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // SEO: Handle www to non-www redirect with proper protocol detection
  const host = req.headers.host;
  if (host && host.startsWith('www.')) {
    // Determine if the request is HTTPS based on headers
    const isHttps = req.headers['x-forwarded-proto'] === 'https' || 
                   req.headers['x-forwarded-ssl'] === 'on' ||
                   req.connection.encrypted;
    const protocol = isHttps ? 'https' : 'http';
    const redirectUrl = `${protocol}://${host.slice(4)}${req.url}`;
    res.writeHead(301, { 'Location': redirectUrl, ...securityHeaders });
    res.end();
    return;
  }
  
  // Handle favicon.ico requests directly to prevent remote requests
  if (req.url === '/favicon.ico') {
    // Serve an empty favicon to prevent browser from requesting it elsewhere
    res.writeHead(200, { 'Content-Type': 'image/x-icon', ...securityHeaders });
    res.end();
    return;
  }
  
  // Normalize the URL path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || 'text/plain';
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile('./404.html', (err, content) => {
          if (err) {
            // No 404 page found
            res.writeHead(404, { 'Content-Type': 'text/html', ...securityHeaders });
            res.end('<html><body><h1>404 Not Found</h1><p>The requested resource could not be found.</p></body></html>');
          } else {
            // Serve 404 page
            res.writeHead(404, { 'Content-Type': 'text/html', ...securityHeaders });
            res.end(content);
          }
        });
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html', ...securityHeaders });
        res.end(`<html><body><h1>500 Internal Server Error</h1><p>${err.code}</p></body></html>`);
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType, ...securityHeaders });
      res.end(content);
    }
  });
});

// Start the server
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});