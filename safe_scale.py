import os
import re

dir_path = 'src/components/home'

def safe_downscale(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Hero text sizes specifically
    # Currently it's: text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] xl:text-[4.2rem]
    content = content.replace('text-[2.2rem] sm:text-[2.8rem]', 'text-[1.7rem] sm:text-[2.4rem]')
    
    # Hide the grid in Hero on mobile
    # <div className="absolute right-[5%] top-[35%] w-[350px] h-[350px] opacity-60">
    content = content.replace('absolute right-[5%] top-[35%] w-[350px] h-[350px] opacity-60', 'hidden lg:block absolute right-[5%] top-[35%] w-[350px] h-[350px] opacity-60')
    
    # In DigitalBankingShowcase.tsx, hide the phone image on mobile
    if 'DigitalBankingShowcase.tsx' in filepath:
        content = content.replace('className="lg:col-span-5 relative flex justify-center lg:justify-end items-center lg:h-full"', 'className="hidden lg:flex lg:col-span-5 relative justify-center lg:justify-end items-center lg:h-full"')
        content = content.replace('className="lg:col-span-7 flex flex-col justify-center"', 'className="lg:col-span-12 flex flex-col justify-center"')
        
    # Scale down padding/margins for mobile ONLY on safe word boundaries
    # E.g. replace py-16 -> py-8 md:py-16
    def scale_px(match):
        prefix = match.group(1) # p, m, py, px, mb, mt
        val = int(match.group(2))
        
        # We don't want to replace inside words, so we only match if preceded by space or quote
        # Actually regex will handle the lookbehind
        if val >= 12:
            return f"{prefix}-{val//2} md:{prefix}-{val}"
        return match.group(0)

    # Use \b to strictly match word boundaries. But \b works weirdly with hyphens.
    # We will match (?<=\s|")([pm][xybtl]?)-(\d+)(?=\s|")
    content = re.sub(r'(?<=\s|")([pm][xybtl]?)-(32|24|20|16|14|12|10)(?=\s|")', lambda m: f"{m.group(1)}-{int(m.group(2))//2} md:{m.group(1)}-{m.group(2)}", content)
    content = re.sub(r'(?<=\s|")(gap)-(32|24|20|16|12|10)(?=\s|")', lambda m: f"gap-{int(m.group(2))//2} md:gap-{m.group(2)}", content)
    
    # Downscale some common large rems
    content = re.sub(r'(?<=\s|")text-\[3\.2rem\](?=\s|")', r'text-[1.8rem] md:text-[3.2rem]', content)
    content = re.sub(r'(?<=\s|")text-\[2\.8rem\](?=\s|")', r'text-[1.7rem] md:text-[2.8rem]', content)
    content = re.sub(r'(?<=\s|")text-\[2\.6rem\](?=\s|")', r'text-[1.6rem] md:text-[2.6rem]', content)
    content = re.sub(r'(?<=\s|")text-\[2\.2rem\](?=\s|")', r'text-[1.5rem] md:text-[2.2rem]', content)
    content = re.sub(r'(?<=\s|")text-\[2rem\](?=\s|")', r'text-[1.4rem] md:text-[2rem]', content)
    content = re.sub(r'(?<=\s|")text-4xl(?=\s|")', r'text-2xl md:text-4xl', content)
    content = re.sub(r'(?<=\s|")text-5xl(?=\s|")', r'text-3xl md:text-5xl', content)
    
    # Clean up any double md: if generated previously
    content = re.sub(r'md:(text-\[[^\]]+\])\s+md:(text-\[[^\]]+\])', r'md:\2', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for filename in os.listdir(dir_path):
    if filename.endswith('.tsx'):
        safe_downscale(os.path.join(dir_path, filename))

print('Safe mobile downscaling applied.')
