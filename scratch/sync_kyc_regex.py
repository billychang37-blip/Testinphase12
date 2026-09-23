import re

kyc_file = "src/app/dashboard/kyc/page.tsx"
with open(kyc_file, "r") as f:
    kyc_content = f.read()

# Target:
# const status = user.user_metadata?.kyc_status;
# if (status) {
#   setKycStatus(status);
# }

# Replace it using regex
kyc_content = re.sub(
    r'const status = user\.user_metadata\?\.kyc_status;\s*if\s*\(status\)\s*\{\s*setKycStatus\(status\);\s*\}',
    r'''const { data: profile } = await supabase.from('profiles').select('kyc_status').eq('id', user.id).single();
      if (profile && profile.kyc_status) {
        setKycStatus(profile.kyc_status);
      }''',
    kyc_content
)

with open(kyc_file, "w") as f:
    f.write(kyc_content)
print("Updated kyc/page.tsx!")
