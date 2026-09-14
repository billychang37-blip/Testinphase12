import os
import re

dir_path = 'src/components/home'

def safe_scale_px(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    def scale_px(match):
        val = int(match.group(1))
        if val >= 22:
            return f"text-[{val-6}px] md:text-[{val}px]"
        elif val >= 18:
            return f"text-[14px] md:text-[{val}px]"
        elif val == 17:
            return f"text-[14px] md:text-[{val}px]"
        return match.group(0)

    # Safe word boundaries for px sizing
    content = re.sub(r'(?<=\s|")text-\[(\d+)px\](?=\s|")', scale_px, content)
    
    # Safe word boundaries for w- / h- on avatars (w-12 h-12 -> w-8 h-8 md:w-12 md:h-12)
    content = re.sub(r'(?<=\s|")w-12(?=\s|")', r'w-8 md:w-12', content)
    content = re.sub(r'(?<=\s|")h-12(?=\s|")', r'h-8 md:h-12', content)

    # Clean up double md:
    content = re.sub(r'md:(text-\[[^\]]+\])\s+md:(text-\[[^\]]+\])', r'md:\2', content)
    content = re.sub(r'lg:(text-\[[^\]]+\])\s+lg:(text-\[[^\]]+\])', r'lg:\2', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for filename in os.listdir(dir_path):
    if filename.endswith('.tsx'):
        safe_scale_px(os.path.join(dir_path, filename))

print('Safe px scaling applied.')
