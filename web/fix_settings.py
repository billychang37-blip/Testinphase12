import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        const nameParts = (profileData.full_name || profileData.name || "").split(' ');
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(' ') || "");
        setPhone(profileData.phone || profileData.phone_number || "");
        setAvatarUrl(profileData.avatar_url || "");
      }"""

new_block = """      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        const merged = { ...profileData, ...session.user.user_metadata };
        setProfile(merged);
        setFirstName(merged.first_name || "");
        setLastName(merged.last_name || "");
        setPhone(merged.phone || "");
        setAvatarUrl(merged.avatar_url || "");
      }"""

content = content.replace(old_block, new_block)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
