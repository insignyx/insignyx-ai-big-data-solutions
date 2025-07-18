import http.server
import socketserver
import ssl
import os
import sys

PORT = 8000
DIRECTORY = "."
# Bind only to localhost for security
HOST = "127.0.0.1"

class SecureHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add security headers
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data:")
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging to avoid excessive output
        if args[0].startswith("GET") and (args[0].endswith("200 -") or args[0].endswith("304 -")):
            return
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format % args))

def run_server():
    try:
        with socketserver.TCPServer((HOST, PORT), SecureHandler) as httpd:
            print(f"Secure server running at http://{HOST}:{PORT}")
            print(f"Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()