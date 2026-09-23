import re

def update_placeholders(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # Replacements mapping placeholder values
    replacements = [
        (r'placeholder="0x\.\.\."(.*?)value=\{profile\.usdt_erc20_address', r'placeholder="Default: 0xE6bbb7D..."\1value={profile.usdt_erc20_address'),
        (r'placeholder="T\.\.\."(.*?)value=\{profile\.usdt_trc20_address', r'placeholder="Default: TFdVrsU..."\1value={profile.usdt_trc20_address'),
        (r'placeholder="0x\.\.\."(.*?)value=\{profile\.usdt_bep20_address', r'placeholder="Default: 0xE6bbb7D..."\1value={profile.usdt_bep20_address'),
        (r'placeholder="0x\.\.\."(.*?)value=\{profile\.usdc_bep20_address', r'placeholder="Default: 0xE6bbb7D..."\1value={profile.usdc_bep20_address'),
        (r'placeholder="Wallet address\.\.\."(.*?)value=\{profile\.usdc_solana_address', r'placeholder="Default: 465xjijip..."\1value={profile.usdc_solana_address'),
    ]
    
    # Wait, the placeholders in my generated UI were like:
    # placeholder="0x..." and the value was BEFORE the placeholder. Let's just use string replacement.
    
    content = content.replace(
        '''value={profile.usdt_erc20_address || ''} onChange={(e) => handleChange('usdt_erc20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="0x..."''',
        '''value={profile.usdt_erc20_address || ''} onChange={(e) => handleChange('usdt_erc20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Default: 0xE6bbb7D8A..."'''
    )
    content = content.replace(
        '''value={profile.usdt_trc20_address || ''} onChange={(e) => handleChange('usdt_trc20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="T..."''',
        '''value={profile.usdt_trc20_address || ''} onChange={(e) => handleChange('usdt_trc20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Default: TFdVrsUjZgy..."'''
    )
    content = content.replace(
        '''value={profile.usdt_bep20_address || ''} onChange={(e) => handleChange('usdt_bep20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="0x..."''',
        '''value={profile.usdt_bep20_address || ''} onChange={(e) => handleChange('usdt_bep20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Default: 0xE6bbb7D8A..."'''
    )
    content = content.replace(
        '''value={profile.usdc_bep20_address || ''} onChange={(e) => handleChange('usdc_bep20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="0x..."''',
        '''value={profile.usdc_bep20_address || ''} onChange={(e) => handleChange('usdc_bep20_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Default: 0xE6bbb7D8A..."'''
    )
    content = content.replace(
        '''value={profile.usdc_solana_address || ''} onChange={(e) => handleChange('usdc_solana_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Wallet address..."''',
        '''value={profile.usdc_solana_address || ''} onChange={(e) => handleChange('usdc_solana_address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-xs focus:border-[#2196F3]" placeholder="Default: 465xjijipUG..."'''
    )

    with open(file_path, "w") as f:
        f.write(content)

update_placeholders("src/app/admin/members/[id]/page.tsx")
update_placeholders("src/app/admin/members/add/page.tsx")
print("Updated placeholders.")
