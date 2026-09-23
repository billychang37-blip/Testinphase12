import re

with open("src/app/dashboard/deposit/crypto/page.tsx", "r") as f:
    content = f.read()

new_get_address = """  const getAddress = (coin: string, network: string) => {
    if (coin === "USDT") {
      if (network === "ERC20") return profile?.usdt_erc20_address || "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
      if (network === "TRC20") return profile?.usdt_trc20_address || "TFdVrsUjZgyQHmMuwp1qwBGVxo8cmmhm6T";
      if (network === "BEP20") return profile?.usdt_bep20_address || "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
    }
    if (coin === "USDC") {
      if (network === "BEP20") return profile?.usdc_bep20_address || "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
      if (network === "Solana") return profile?.usdc_solana_address || "465xjijipUGSzW6xUiWzjk7PsZkgj3t22HkhnMm7PJvx";
    }
    return "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
  };"""

content = re.sub(r'  const getAddress = \(coin: string, network: string\) => \{.*?  \};', new_get_address, content, flags=re.DOTALL)

with open("src/app/dashboard/deposit/crypto/page.tsx", "w") as f:
    f.write(content)

print("Updated getAddress logic.")
