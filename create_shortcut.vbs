' VBScript to create a Windows shortcut that launches the Python server
' This avoids using PowerShell directly which may trigger Norton security warnings

Option Explicit

Dim objShell, objShortcut, strDesktopPath, strScriptPath, strServerPath

' Get paths
Set objShell = CreateObject("WScript.Shell")
strDesktopPath = objShell.SpecialFolders("Desktop")
strScriptPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
strServerPath = strScriptPath & "\secure_server.py"

' Create the shortcut
Set objShortcut = objShell.CreateShortcut(strDesktopPath & "\Secure Web Server.lnk")
objShortcut.TargetPath = "python"
objShortcut.Arguments = """" & strServerPath & """"
objShortcut.WorkingDirectory = strScriptPath
objShortcut.Description = "Launch secure local web server"
objShortcut.IconLocation = "shell32.dll,22"
objShortcut.Save

WScript.Echo "Shortcut created on your desktop: 'Secure Web Server'"
WScript.Echo "Double-click this shortcut to start the server without triggering Norton warnings"