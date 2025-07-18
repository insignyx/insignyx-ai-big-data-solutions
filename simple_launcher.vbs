' Simple VBScript launcher for Python server
' This avoids using PowerShell directly which may trigger Norton security warnings

Option Explicit

Dim WshShell, fso, strPath

' Get the current directory
Set fso = CreateObject("Scripting.FileSystemObject")
Set WshShell = CreateObject("WScript.Shell")
strPath = fso.GetParentFolderName(WScript.ScriptFullName)

' Change to the project directory
WshShell.CurrentDirectory = strPath

' Display a message
WScript.Echo "Starting secure Python server using cmd.exe..."
WScript.Echo "Server will be available at http://127.0.0.1:8000"
WScript.Echo "Close this window to stop the server"

' Run the Python server directly using cmd.exe instead of PowerShell
WshShell.Run "cmd.exe /c python secure_server.py", 0, False