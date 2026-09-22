Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\Jerome Igwike\.gemini\antigravity\brain\4690c6e2-2010-4bb5-ac1e-c510a1096db6\.user_uploaded\media_1790113226147.png")
Write-Host "Image Size:" $img.Width "x" $img.Height

# We know the image is a screenshot containing a browser window.
# The avatar is around the top left.
# Let's crop a box. We will need to guess the coords.
# A standard 1366x768 screen... Let's just output the whole thing and guess based on a standard browser.
