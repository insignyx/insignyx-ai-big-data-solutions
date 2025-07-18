# Avoiding Norton Security Warnings with Local Development Servers

## The Problem

Norton 360 and other security software may flag local development servers as potential threats, particularly when they:

1. Bind to all network interfaces (0.0.0.0) instead of just localhost
2. Are launched through PowerShell or command line
3. Use certain ports or protocols that trigger heuristic detection
4. Lack proper security headers

The specific warning you're seeing (`IDP.HELU.PSE46 - Command line detection`) is related to Norton detecting potentially suspicious command line activity when launching the server.

## Solution Options

We've provided multiple solutions to help you run a local development server without triggering security warnings:

### Option 1: Secure Python Server with Batch File Launcher

1. Double-click the `start_server.bat` file
2. The server will start on http://127.0.0.1:8000
3. Access the website by opening your browser to http://127.0.0.1:8000

This approach:
- Uses a batch file instead of PowerShell to launch the server
- Binds only to localhost
- Adds security headers
- Provides proper error handling

### Option 2: Node.js Express Server (Recommended)

This option may be less likely to trigger security warnings as it uses Node.js instead of Python:

1. Install Node.js if you don't have it already (https://nodejs.org/)
2. Open a Command Prompt (not PowerShell) in this directory
3. Run: `npm install` (first time only)
4. Run: `npm start` or double-click `start_node_server.bat`
5. Access the website at http://127.0.0.1:8000

The Node.js server includes:
- Helmet.js for comprehensive security headers
- Express.js for efficient static file serving
- Localhost-only binding
- Proper error handling

### Option 3: Add Norton Exception

If you prefer to use the original server:

1. Open Norton 360
2. Go to Settings > Firewall > Program Control
3. Add an exception for Python and/or PowerShell when running your development server
4. Alternatively, temporarily disable Norton's real-time protection while developing locally

## Security Features Implemented

Both server options include:

- Localhost-only binding (127.0.0.1)
- Security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Content-Security-Policy: Restricts resources to trusted sources
- Reduced logging of common requests
- Proper error handling and graceful shutdown
- Non-PowerShell launch options

## Troubleshooting

If you still encounter security warnings:

1. Try running the server with administrator privileges
2. Use a different port (edit the PORT variable in the server files)
3. Try a different browser
4. Consider using a different development environment like VS Code's Live Server extension

## Important Note

These servers are for local development only. For production, use a proper web server like Nginx, Apache, or a cloud hosting service.