const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkDB() {
    const { data, error } = await supabase.from('transactions').select('*').eq('type', 'kyc_request');
    console.log("KYC Requests with Service Role:", data);
    console.log("Error:", error);
}

checkDB();
