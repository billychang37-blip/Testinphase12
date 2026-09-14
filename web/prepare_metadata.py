import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update layout to also grab user_metadata
metadata_injection = '''const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) {
        // Merge user_metadata (avatar, kyc, etc) with profile data
        const mergedProfile = { ...profileData, ...session.user.user_metadata };
        setProfile(mergedProfile);
      }'''

content = content.replace(
    'const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();\n      if (profileData) setProfile(profileData);',
    metadata_injection
)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated layout to merge user_metadata into profile")
