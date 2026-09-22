import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: Request) {
  try {
    // We use the service role key to bypass RLS entirely so admins can see all data
    // (RLS usually blocks users from seeing other users' data)
    
    // Fetch all profiles
    const { data: users, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('id, first_name, last_name, email, kyc_status, status, last_ip, last_active_at, account_number');
      
    if (userError) throw userError;

    // Fetch all transactions
    const { data: txs, error: txError } = await supabaseAdmin
      .from('transactions')
      .select('type, amount, status, created_at, wallet_used');
      
    if (txError) throw txError;

    return NextResponse.json({ users, txs });
  } catch (err: any) {
    console.error('Dashboard API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
