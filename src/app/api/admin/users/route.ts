import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

export async function GET(request: Request) {
  try {
    // In a real app, verify the request has a valid admin session token here.
    // For now, we use the service role key to fetch all users bypassing RLS.
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('first_name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, first_name, phone, status, country, state, recovery_phrase, transfer_fee, swift_pin } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Create user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { first_name, phone }
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
        first_name,
        phone,
        status,
        country,
        state,
        recovery_phrase,
        transfer_fee,
        swift_pin,
        generated_pin: password // Save initial password as pin for admin viewing
      })
      .eq('id', userId);

    if (profileError) {
      // If the trigger didn't fire or failed, we can insert manually
      const { error: insertError } = await supabaseAdmin.from('profiles').insert([{
        id: userId,
        email,
        first_name,
        phone,
        status,
        country,
        state,
        recovery_phrase,
        transfer_fee,
        swift_pin,
        generated_pin: password
      }]);
      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
