import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update fetchUser in settings to merge user_metadata
metadata_injection = '''const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) {
        const merged = { ...profileData, ...session.user.user_metadata };
        setProfile(merged);
        const nameParts = (merged.first_name + " " + merged.last_name).split(' ');
        setFirstName(merged.first_name || "");
        setLastName(merged.last_name || "");
        setPhone(merged.phone || "");
        setAvatarUrl(merged.avatar_url || "");
      }'''

content = re.sub(r'const \{ data: profileData \} = await supabase\.from\("profiles"\)\.select\("\*"\)\.eq\("id", session\.user\.id\)\.single\(\);\s*if \(profileData\) \{.*?\s*setAvatarUrl\(profileData\.avatar_url \|\| ""\);\s*\}', metadata_injection, content, flags=re.DOTALL)

# Update handleAvatarUpload to use updateUser
update_user = '''await supabase.auth.updateUser({ data: { avatar_url: base64String } });'''
content = content.replace(
    "const { error } = await supabase.from('profiles').update({ avatar_url: base64String }).eq('id', session.user.id);",
    update_user
)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated settings to use auth.updateUser for avatar")
