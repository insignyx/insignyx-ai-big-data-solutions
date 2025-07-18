# PowerShell script to add favicon links to all HTML files

$htmlFiles = Get-ChildItem -Path "c:\Users\jigne\Repos\insignyx-ai-big-data-solutions" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if favicon links already exist
    if ($content -notmatch '<link rel="icon" href="favicon.ico"') {
        # Find the head tag and add favicon links after it
        $newContent = $content -replace '(<head>\s*)', "$1`r`n  <link rel=`"icon`" href=`"favicon.ico`" type=`"image/x-icon`" />`r`n  <link rel=`"shortcut icon`" href=`"favicon.ico`" type=`"image/x-icon`" />"
        
        # Write the modified content back to the file
        Set-Content -Path $file.FullName -Value $newContent
        
        Write-Host "Added favicon links to $($file.Name)"
    } else {
        Write-Host "Favicon links already exist in $($file.Name)"
    }
}

Write-Host "Completed adding favicon links to all HTML files."