import re

with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the girl image large and properly anchored
# Replace the absolute wrapper
old_wrapper = 'className="absolute right-0 bottom-0 w-full md:w-[70%] lg:w-[50%] h-[30vh] md:h-[45vh] lg:h-[65%] pointer-events-none z-20 flex justify-end lg:justify-end items-end pr-0 lg:pr-12"'
new_wrapper = 'className="absolute right-0 bottom-0 w-full md:w-[70%] lg:w-[50%] h-[400px] md:h-[500px] lg:h-[700px] pointer-events-none z-20 flex justify-end lg:justify-end items-end pr-0 lg:pr-12"'

content = content.replace(old_wrapper, new_wrapper)

with open('src/components/home/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Hero image wrapper")
