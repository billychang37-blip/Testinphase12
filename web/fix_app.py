import sys
import re

with open('src/components/home/AppDownloadAndSecurity.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Delete the left column with the image
image_col = r'''          \{/\* Left Image - The OCBC Digital App \*/\}
          <motion\.div
            initial=\{\{ opacity: 0, x: -30 \}\}
            whileInView=\{\{ opacity: 1, x: 0 \}\}
            viewport=\{\{ once: true, margin: "-10%" \}\}
            transition=\{\{ duration: 0\.8, ease: \[0\.16, 1, 0\.3, 1\] \}\}
            className="lg:col-span-5 flex justify-center lg:justify-start relative mb-12 lg:mb-0"
          >
            <motion\.div
              animate=\{\{ y: \[0, -15, 0\] \}\}
              transition=\{\{ duration: 6, repeat: Infinity, ease: "easeInOut" \}\}
              className="w-full flex justify-center lg:justify-start relative z-10"
            >
              <img 
                src="/new mock up\.png" 
                alt="OCBC Mobile App Mockup" 
                className="w-full max-w-\[280px\] lg:max-w-\[330px\] h-auto object-contain drop-shadow-\[0_30px_60px_rgba\(227,24,55,0\.15\)\] hover:-translate-y-2 transition-transform duration-700 ease-out"
              />
            </motion\.div>
          </motion\.div>'''

# Using string replacement with accurate multiline handling if needed, or regex. Let's just use string replacement carefully.
# Wait, my regex might fail if spaces don't match. I'll just match the lg:col-span-5 div and remove it.

content = re.sub(r'\{\/\* Left Image - The OCBC Digital App \*\/\}[\s\S]*?(?=\{\/\* Right Content)', '', content)

# Adjust the right content to take full width
content = content.replace('lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-10', 'lg:col-span-12 flex flex-col justify-center max-w-4xl mx-auto')

with open('src/components/home/AppDownloadAndSecurity.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed AppDownloadAndSecurity')
