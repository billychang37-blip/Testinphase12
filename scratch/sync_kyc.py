import re

# 1. Update /dashboard/kyc/page.tsx to fetch from profiles
kyc_file = "src/app/dashboard/kyc/page.tsx"
with open(kyc_file, "r") as f:
    kyc_content = f.read()

# Replace user_metadata check with profile check
old_fetch = """        const status = user.user_metadata?.kyc_status;
        if (status) {
          setKycStatus(status);
        }"""
new_fetch = """        const { data: profile } = await supabase.from('profiles').select('kyc_status').eq('id', user.id).single();
        if (profile && profile.kyc_status) {
          setKycStatus(profile.kyc_status);
        }"""
kyc_content = kyc_content.replace(old_fetch, new_fetch)

with open(kyc_file, "w") as f:
    f.write(kyc_content)

# 2. Update /api/admin/kyc/route.ts to update BOTH user_metadata and profiles table
admin_kyc_file = "src/app/api/admin/kyc/route.ts"
with open(admin_kyc_file, "r") as f:
    admin_kyc = f.read()

# Replace updateUserById block
old_admin = """    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { kyc_status: newKycStatus }
    });"""

new_admin = """    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { kyc_status: newKycStatus }
    });

    // ALSO update the profiles table so everything stays perfectly in sync!
    await supabaseAdmin.from('profiles').update({ kyc_status: newKycStatus }).eq('id', userId);"""

admin_kyc = admin_kyc.replace(old_admin, new_admin)

with open(admin_kyc_file, "w") as f:
    f.write(admin_kyc)

print("Synchronized KYC statuses across dashboard and admin API.")
