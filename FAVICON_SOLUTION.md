# Favicon Solution for Norton Security Warning

## Issue
Norton Security was detecting a threat when the browser attempted to fetch a missing `favicon.ico` file from the domain root (`insignyx.com`). The specific warning was:

- **Threat name**: Other:Malware-gen [Trj]
- **Threat type**: Trojan Horse
- **URL**: http://insignyx.com/favicon.ico
- **Process**: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
- **Detected by**: Safe Web
- **Status**: Connection aborted

## Root Cause
When a website doesn't provide a favicon file, web browsers automatically attempt to fetch one from the domain root. In this case, when viewing the local development site, the browser was trying to fetch the favicon from `insignyx.com` instead of using a local file. Norton's security heuristics flagged this connection as potentially malicious.

## Solution Implemented

1. **Created a local favicon.ico file**:
   - Added an empty `favicon.ico` file to the project root directory
   - This prevents the browser from attempting to fetch the favicon from the remote domain

2. **Added proper favicon references to all HTML files**:
   - Added the following HTML tags to the `<head>` section of all HTML files:
     ```html
     <link rel="icon" href="favicon.ico" type="image/x-icon" />
     <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
     ```
   - Created and ran a PowerShell script (`add_favicon_to_all_html.ps1`) to automate this process

## Why This Works

1. **Local Resource**: By providing a local favicon file, the browser no longer attempts to fetch it from the remote domain
2. **Explicit References**: The added HTML tags explicitly tell the browser where to find the favicon
3. **Consistent Implementation**: All HTML pages now have the same favicon references

## Additional Recommendations

1. **Create a proper favicon**: Replace the empty favicon with a proper branded icon
2. **Consider using different favicon formats** for better cross-browser support:
   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   <link rel="manifest" href="/site.webmanifest">
   ```

## Verification
The solution has been tested by running the local server and verifying that Norton no longer displays security warnings when accessing the site.