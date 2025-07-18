' VBScript launcher for Python server
' This avoids using PowerShell directly which may trigger Norton security warnings

Option Explicit

Dim WshShell, oExec
Dim strCommand, strPath

' Get the current directory
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Change to the directory and run the Python server
Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = strPath

' Display a message
WScript.Echo "Starting secure Python server..."
WScript.Echo "Server will be available at http://127.0.0.1:8000"
WScript.Echo "Close this window to stop the server"

' Run the Python server
strCommand = "python secure_server.py"
Set oExec = WshShell.Exec(strCommand)

' Wait for the process to complete
Do While oExec.Status = 0
    WScript.Sleep 100
Loop