import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
      .select('id, first_name, last_name, email, wallet_balance, btc_balance, eth_balance, usdt_balance, usdc_balance, usdt_erc20_balance, usdt_trc20_balance, usdt_bep20_balance, usdc_solana_balance, usdc_bep20_balance, account_number, currency')
      .order('first_name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
