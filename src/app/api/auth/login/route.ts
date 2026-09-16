import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We must use the service role key to query profiles by the generated User ID
// since the user is not authenticated yet.
const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

export async function POST(request: Request) {
  try {
    const { userId, pin } = await request.json();

    if (!userId || !pin) {
      return NextResponse.json({ error: 'User ID and PIN are required.' }, { status: 400 });
    }

    // 1. Look up the user's actual email using the provided User ID (Access Code)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('email, generated_pin, account_type')
      .eq('generated_user_id', userId)
      .single();

    if (profileError || !profile) {
      // Return a generic error to prevent User ID enumeration
      return NextResponse.json({ error: 'Invalid User ID or PIN.' }, { status: 401 });
    }

    // 2. Verify the PIN matches the one we generated and stored
    // Note: In a true production app, we would hash the generated PIN in the database.
    // For this prototype, we are strictly matching the plain text generated_pin.
    if (profile.generated_pin !== pin) {
      return NextResponse.json({ error: 'Invalid User ID or PIN.' }, { status: 401 });
    }

    // 3. Since the PIN matches, return the actual email to the client 
    // so the frontend can establish the official Supabase Auth session using the PIN as the password.
    return NextResponse.json({ 
      success: true, 
      email: profile.email,
      account_type: profile.account_type
    });

  } catch (err: any) {
    console.error('Server error during login:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
