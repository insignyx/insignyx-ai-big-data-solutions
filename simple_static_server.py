import http.server
import socketserver

PORT = 8000
DIRECTORY = "."
# Bind only to localhost for security
HOST = "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print(f"Serving at http://{HOST}:{PORT}")
    httpd.serve_forever()
