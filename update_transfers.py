import os

directory = 'src/app/dashboard/transfer'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content = content.replace('(Click To Get Your Master Soft Token*)', '(Activate Soft Token)')
            content = content.replace('(Click Activate Your Soft Token.)', '(Activate Soft Token)')
            content = content.replace('(Click Activate Your Soft Token)', '(Activate Soft Token)')
            content = content.replace('Activate your <span className="text-[#E81C24]">Soft Token</span>', 'Activate your <span className="text-[#E81C24]">Soft Token</span>')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print('Updated transfer pages')
