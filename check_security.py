import sys
with open('src/components/home/SecurityHub.tsx', 'r', encoding='utf-8') as f:
    print([line for line in f if 'absolute -top' in line])
