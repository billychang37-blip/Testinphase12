import re

def swap_spread_order(file_path, search_str, replace_str):
    with open(file_path, "r") as f:
        content = f.read()
    content = content.replace(search_str, replace_str)
    with open(file_path, "w") as f:
        f.write(content)

# Update layout.tsx
swap_spread_order(
    "src/app/dashboard/layout.tsx", 
    "setProfile({ ...profileData, ...session.user.user_metadata });", 
    "setProfile({ ...session.user.user_metadata, ...profileData });"
)

# Update settings/page.tsx
swap_spread_order(
    "src/app/dashboard/settings/page.tsx", 
    "const merged = { ...profileData, ...session.user.user_metadata };", 
    "const merged = { ...session.user.user_metadata, ...profileData };"
)

print("Swapped spread order in layout and settings so database wins!")
