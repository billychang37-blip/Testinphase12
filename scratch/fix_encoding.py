import re

def fix_encoding(file_path):
    # Read the file with the default (corrupt) encoding to recover it
    with open(file_path, "r", encoding="cp1252", errors="replace") as f:
        content = f.read()

    # Replace the weird bullet characters with a standard dash
    content = content.replace("•", " - ")
    # Or just replace the weird characters if they were mangled
    content = content.replace("?", " - ")
    content = content.replace("", " - ")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

fix_encoding("src/app/dashboard/page.tsx")
fix_encoding("src/app/dashboard/transactions/page.tsx")

print("Fixed encodings.")
