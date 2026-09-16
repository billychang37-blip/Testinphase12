import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the upload logic
upload_regex = re.compile(r'const fileExt = file\.name\.split\(\'\.\'\)\.pop\(\);\s*const filePath = `public/\$\{session\.user\.id\}\.\$\{fileExt\}`;\s*const \{ error: uploadError \} = await supabase\.storage\s*\.from\(\'avatars\'\)\s*\.upload\(filePath, file, \{ upsert: true \}\);\s*if \(uploadError\) \{\s*setSaveMsg\("Failed to upload picture\."\);\s*setTimeout\(\(\) => setSaveMsg\(""\), 3000\);\s*return;\s*\}\s*const \{ data: \{ publicUrl \} \} = supabase\.storage\s*\.from\(\'avatars\'\)\s*\.getPublicUrl\(filePath\);\s*await supabase\.from\(\'profiles\'\)\.update\(\{ avatar_url: publicUrl \}\)\.eq\(\'id\', session\.user\.id\);\s*setAvatarUrl\(publicUrl\);\s*setProfile\(\{\.\.\.profile, avatar_url: publicUrl\}\);\s*setSaveMsg\("Picture updated successfully!"\);\s*setTimeout\(\(\) => setSaveMsg\(""\), 3000\);', re.DOTALL)

new_upload = '''const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result as string;
        await supabase.from('profiles').update({ avatar_url: base64String }).eq('id', session.user.id);
        setAvatarUrl(base64String);
        setProfile({...profile, avatar_url: base64String});
        setSaveMsg("Picture updated successfully!");
        setTimeout(() => setSaveMsg(""), 3000);
      } catch (err) {
        setSaveMsg("Failed to upload picture.");
        setTimeout(() => setSaveMsg(""), 3000);
      }
    };
    reader.readAsDataURL(file);'''

content = upload_regex.sub(new_upload, content)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated avatar upload to use base64")
