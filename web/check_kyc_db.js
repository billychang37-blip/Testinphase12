const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkDB() {
    const { data, error } = await supabase.from('transactions').select('*').eq('type', 'kyc_request');
    console.log("KYC Requests:", data);
    console.log("Error:", error);
}

checkDB();
