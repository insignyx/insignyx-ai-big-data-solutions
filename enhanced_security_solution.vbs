' Enhanced Security Solution for Norton Warnings
' This script addresses both favicon and PowerShell detection issues

Option Explicit

Dim WshShell, fso, strPath
Dim objFile

' Get the current directory
Set fso = CreateObject("Scripting.FileSystemObject")
Set WshShell = CreateObject("WScript.Shell")
strPath = fso.GetParentFolderName(WScript.ScriptFullName)

' Change to the project directory
WshShell.CurrentDirectory = strPath

' Step 1: Create favicon.ico if it doesn't exist
If Not fso.FileExists(strPath & "\favicon.ico") Then
    Set objFile = fso.CreateTextFile(strPath & "\favicon.ico", True)
    objFile.Close
    WScript.Echo "Created empty favicon.ico file"
Else
    WScript.Echo "Favicon.ico already exists"
End If

' Step 2: Add favicon references to all HTML files using a simpler approach
WScript.Echo "Adding favicon references to HTML files..."

Dim objFolder, objFiles, objFile2
Set objFolder = fso.GetFolder(strPath)
Set objFiles = objFolder.Files

For Each objFile2 In objFiles
    If LCase(fso.GetExtensionName(objFile2.Name)) = "html" Then
        ' Read file content
        Dim fileContent, updatedContent
        Dim objTextFile
        
        Set objTextFile = fso.OpenTextFile(objFile2.Path, 1)
        fileContent = objTextFile.ReadAll
        objTextFile.Close
        
        ' Check if favicon links already exist
        If InStr(fileContent, "<link rel=\"icon\" href=\"favicon.ico\"") = 0 Then
            ' Add favicon links after head tag
            updatedContent = Replace(fileContent, "<head>", "<head>" & vbCrLf & _
                "  <link rel=\"icon\" href=\"favicon.ico\" type=\"image/x-icon\" />" & vbCrLf & _
                "  <link rel=\"shortcut icon\" href=\"favicon.ico\" type=\"image/x-icon\" />")
            
            ' Write updated content back to file
            Set objTextFile = fso.OpenTextFile(objFile2.Path, 2)
            objTextFile.Write updatedContent
            objTextFile.Close
            
            WScript.Echo "Added favicon links to " & objFile2.Name
        Else
            WScript.Echo "Favicon links already exist in " & objFile2.Name
        End If
    End If
Next

' Step 3: Create a desktop shortcut for future use
Dim objShortcut, strDesktopPath
strDesktopPath = WshShell.SpecialFolders("Desktop")

' Create the shortcut
Set objShortcut = WshShell.CreateShortcut(strDesktopPath & "\Secure Web Server.lnk")
objShortcut.TargetPath = "cmd.exe"
objShortcut.Arguments = "/c python " & strPath & "\secure_server.py"
objShortcut.WorkingDirectory = strPath
objShortcut.Description = "Launch secure local web server"
objShortcut.IconLocation = "shell32.dll,22"
objShortcut.Save

WScript.Echo "Shortcut created on your desktop: 'Secure Web Server'"
WScript.Echo "Double-click this shortcut to start the server without triggering Norton warnings"

' Step 4: Launch the Python server directly (avoiding PowerShell)
WScript.Echo "Starting secure Python server..."
WScript.Echo "Server will be available at http://127.0.0.1:8000"
WScript.Echo "Close this window to stop the server"

' Run the Python server directly without PowerShell
Dim oExec
Set oExec = WshShell.Exec("cmd /c python secure_server.py")

' Wait for the process to complete
Do While oExec.Status = 0
    WScript.Sleep 100
Loop