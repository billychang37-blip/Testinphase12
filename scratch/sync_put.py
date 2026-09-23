import re

file_path = "src/app/api/admin/users/[id]/route.ts"
with open(file_path, "r") as f:
    content = f.read()

# Find the update(body) call
old_update = """      const { error } = await supabaseAdmin
        .from('profiles')
        .update(body)
        .eq('id', id);"""

new_update = """      const { error } = await supabaseAdmin
        .from('profiles')
        .update(body)
        .eq('id', id);

      // Keep Auth metadata in sync if kyc_status or phone is updated
      if (body.kyc_status) {
        await supabaseAdmin.auth.admin.updateUserById(id, {
          user_metadata: { kyc_status: body.kyc_status }
        });
      }"""

content = content.replace(old_update, new_update)

with open(file_path, "w") as f:
    f.write(content)

print("Updated user PUT route.")
