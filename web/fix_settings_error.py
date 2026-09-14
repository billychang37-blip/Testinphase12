import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '''await supabase.auth.updateUser({ data: { avatar_url: base64String } });
          if (error) throw error;''',
    '''const { error } = await supabase.auth.updateUser({ data: { avatar_url: base64String } });
          if (error) throw error;'''
)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
