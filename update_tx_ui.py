import re

files_to_update = ['src/app/dashboard/page.tsx', 'src/app/dashboard/transactions/page.tsx']

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update Icon classes
        content = re.sub(
            r'tx\.type === \'deposit\' \n              \? tx\.wallet_used === \'main\' \? \'bg-blue-50 text-blue-600\' : \'bg-emerald-50 text-emerald-600\' \n              : \'bg-red-50 text-red-600\'',
            r'tx.type === \'soft_token_purchase\' ? \'bg-indigo-50 text-indigo-600\' :\n            tx.type === \'deposit\' \n              ? tx.wallet_used === \'main\' ? \'bg-blue-50 text-blue-600\' : \'bg-emerald-50 text-emerald-600\' \n              : \'bg-red-50 text-red-600\'',
            content
        )

        # Update Icon components
        content = re.sub(
            r'\{tx\.type === \'deposit\' \? \(\n              tx\.wallet_used === \'main\' \? <Landmark className="w-5 h-5" /> : <ArrowDownToLine className="w-5 h-5" />\n            \) : \(\n              <ArrowUpRight className="w-5 h-5" />\n            \)\}',
            r'{tx.type === \'soft_token_purchase\' ? <Lock className="w-5 h-5" /> :\n            tx.type === \'deposit\' ? (\n              tx.wallet_used === \'main\' ? <Landmark className="w-5 h-5" /> : <ArrowDownToLine className="w-5 h-5" />\n            ) : (\n              <ArrowUpRight className="w-5 h-5" />\n            )}',
            content
        )

        # Update Title
        content = re.sub(
            r'\{tx\.type === \'deposit\' \n                \? tx\.wallet_used === \'main\' \n                  \? tx\.sender_name \? From \$\{tx\.sender_name\} : \(tx\.description\?\.includes\(\'from\'\) \? tx\.description\.split\(\'from\'\)\[1\]\.trim\(\) : \'Bank Deposit\'\)\n                  : \$\{tx\.wallet_used\.startsWith\(\'usdt\'\) \? \'USDT\' : \(tx\.wallet_used\.startsWith\(\'usdc\'\) \? \'USDC\' : \'Crypto\'\)\} Deposit\n                : \'Withdrawal\'\n              \}',
            r'{tx.type === \'soft_token_purchase\' \n                ? \'Soft Token Activation\'\n                : tx.type === \'deposit\' \n                  ? tx.wallet_used === \'main\' \n                    ? tx.sender_name ? From  : (tx.description?.includes(\'from\') ? tx.description.split(\'from\')[1].trim() : \'Bank Deposit\')\n                    : ${tx.wallet_used.startsWith(\'usdt\') ? \'USDT\' : (tx.wallet_used.startsWith(\'usdc\') ? \'USDC\' : \'Crypto\')} Deposit\n                  : \'Withdrawal\'\n              }',
            content
        )

        # Update Network/Sender
        content = re.sub(
            r'\{tx\.wallet_used === \'main\' \n                  \? tx\.bank_name \|\| \'Bank Transfer\'\n                  : \(tx\.description\?\.includes\(\'via\'\) \? tx\.description\.split\(\'via\'\)\[1\]\.split\(\'from\'\)\[0\]\.trim\(\) : \'Blockchain\'\)\n                \}',
            r'{tx.type === \'soft_token_purchase\'\n                  ? \'System Security\'\n                  : tx.wallet_used === \'main\' \n                    ? tx.bank_name || \'Bank Transfer\'\n                    : (tx.description?.includes(\'via\') ? tx.description.split(\'via\')[1].split(\'from\')[0].trim() : \'Blockchain\')\n                }',
            content
        )

        # Update Status Color
        content = re.sub(
            r'\(tx\.status \|\| \'completed\'\)\.toLowerCase\(\) === \'completed\' \? \'bg-emerald-100 text-emerald-700\' :\n              \(tx\.status \|\| \'completed\'\)\.toLowerCase\(\) === \'pending\' \? \'bg-amber-100 text-amber-700\' :\n              \'bg-red-100 text-red-700\'',
            r'(tx.status || \'completed\').toLowerCase() === \'completed\' ? \'bg-emerald-100 text-emerald-700\' :\n              (tx.status || \'completed\').toLowerCase() === \'processing\' ? \'bg-blue-100 text-blue-700\' :\n              (tx.status || \'completed\').toLowerCase() === \'pending\' ? \'bg-amber-100 text-amber-700\' :\n              \'bg-red-100 text-red-700\'',
            content
        )

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

