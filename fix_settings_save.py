import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix handleSaveProfile
content = content.replace(
    '''      const { error } = await supabase.from('profiles').update({
        full_name: `${firstName} ${lastName}`.trim(),
        phone: phone,
        phone_number: phone
      }).eq('id', session.user.id);''',
    '''      const { error } = await supabase.from('profiles').update({
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }).eq('id', session.user.id);'''
)

content = content.replace(
    '''setProfile({...profile, full_name: `${firstName} ${lastName}`.trim(), phone, phone_number: phone});''',
    '''setProfile({...profile, first_name: firstName, last_name: lastName, phone});'''
)

# Fix Avatar Upload to compress the image
new_avatar_logic = '''
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const base64String = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
          const { error } = await supabase.from('profiles').update({ avatar_url: base64String }).eq('id', session.user.id);
          if (error) throw error;
          
          setAvatarUrl(base64String);
          setProfile({...profile, avatar_url: base64String});
          setSaveMsg("Picture updated successfully!");
        } catch (err) {
          setSaveMsg("Failed to upload picture.");
        }
        setTimeout(() => setSaveMsg(""), 3000);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
'''

# Find the old reader logic
old_avatar_logic = re.compile(r'const reader = new FileReader\(\);\s*reader\.onloadend = async \(\) => \{.*?reader\.readAsDataURL\(file\);', re.DOTALL)
content = old_avatar_logic.sub(new_avatar_logic.strip(), content)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed settings save and avatar upload")
