import os

file_path = "src/app/api/admin/users/route.ts"

with open(file_path, "r") as f:
    content = f.read()

new_post = """export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, generated_pin, ...profileData } = body;

    if (!email || !generated_pin) {
      return NextResponse.json({ error: "Email and Generated PIN (password) are required" }, { status: 400 });
    }

    // Create user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: generated_pin,
      email_confirm: true,
      user_metadata: { first_name: profileData.first_name, phone: profileData.phone }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // Wait a brief moment to allow the trigger to create the profile, 
    // then update it with the rest of the custom fields.
    await new Promise(resolve => setTimeout(resolve, 500));

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        ...profileData,
        email,
        generated_pin
      })
      .eq('id', userId);

    if (profileError) {
      // If the trigger didn't fire or failed, we can insert manually
      const { error: insertError } = await supabaseAdmin.from('profiles').insert([{
        id: userId,
        ...profileData,
        email,
        generated_pin
      }]);
      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}"""

# Replace the old POST block
import re
new_content = re.sub(r'export async function POST\(request: Request\) \{.*', new_post, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(new_content)

print("Updated POST route.")
