import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('transactions')
      .select('id, user_id, status, description, created_at, type')
      .eq('type', 'kyc_request')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // We also need the user profiles, which requires a separate query or join if RLS is bypassed.
    // Since we are admin, let's just fetch all profiles and map them.
    const { data: users, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    const txsWithProfiles = data.map(tx => {
      const user = users.users.find(u => u.id === tx.user_id);
      return {
        ...tx,
        profiles: {
          first_name: user?.user_metadata?.first_name || 'Unknown',
          last_name: user?.user_metadata?.last_name || 'User',
          email: user?.email || 'No email'
        }
      };
    });

    return NextResponse.json({ requests: txsWithProfiles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { transactionId, userId, action } = await request.json(); 
    
    if (!transactionId || !userId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const newKycStatus = action === 'approve' ? 'approved' : 'unverified';
    const newTxStatus = action === 'approve' ? 'completed' : 'failed';

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { kyc_status: newKycStatus }
    });

    if (authError) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    const { error: txError } = await supabaseAdmin
      .from('transactions')
      .update({ status: newTxStatus })
      .eq('id', transactionId);

    if (txError) {
      return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server Error' }, { status: 500 });
  }
}
