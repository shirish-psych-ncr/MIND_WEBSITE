$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Extract content between <main ...> and </main>
    if ($content -match '(?s)<main[^>]*>(.*)</main>') {
        $mainContent = $Matches[1].Trim()
        
        # Create the new Astro content
        $astroContent = @"
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
$mainContent
</BaseLayout>
"@
        
        # Define new path
        $newFileName = $file.BaseName + ".astro"
        $newPath = Join-Path "src/pages" $newFileName
        
        # Write file without BOM
        [System.IO.File]::WriteAllText($newPath, $astroContent)
        Write-Host "Migrated: $($file.Name) -> src/pages/$newFileName" -ForegroundColor Green
    } else {
        Write-Warning "Could not find <main> tag in $($file.Name). Skipping."
    }
}
