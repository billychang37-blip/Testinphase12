import re

with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the text positioning so it's centered
content = content.replace(
    '<div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end">',
    '<div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center mt-[-5%]">'
)

content = content.replace(
    '<div className="lg:col-span-6 pb-[30vh] md:pb-[45vh] lg:pb-32 z-20 pt-4 lg:self-end self-start">',
    '<div className="lg:col-span-6 pb-20 md:pb-10 lg:pb-0 z-20 pt-4 self-center lg:self-center">'
)

with open('src/components/home/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed text positioning in Hero")
