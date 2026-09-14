import sys
import re

with open('src/app/dashboard/deposit/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the features list in Deposit options
# It was: <div className="flex items-center gap-5">
# We change it to flex-wrap and smaller gaps on mobile
content = content.replace(
    '<div className="flex items-center gap-5">\n                    <div className="flex items-center gap-1.5">',
    '<div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">\n                    <div className="flex items-center gap-1.5">'
)
content = content.replace(
    '<div className="flex items-center gap-5">\n                    <div className="flex items-center gap-2">',
    '<div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">\n                    <div className="flex items-center gap-2">'
)

# And reduce the overall container padding and gap for the deposit option cards
content = content.replace('p-4 md:p-6 flex items-center justify-between', 'p-4 flex items-center justify-between')
# The text-gray-500 text
content = content.replace('text-[13px] text-gray-500 mb-3', 'text-[12px] md:text-[13px] text-gray-500 mb-2')
# Card Icon sizing
content = content.replace('w-[52px] h-[52px]', 'w-[44px] h-[44px] md:w-[52px] md:h-[52px]')

# The "Your security is our priority" block is too large in screenshot 1
# Let's see if we can find it in this file. Wait, in the screenshot it's on the deposit page!
# "Your security is our priority"
