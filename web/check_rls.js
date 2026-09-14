const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkRLS() {
    const { data, error } = await supabase.rpc('get_policies');
    // Supabase doesn't have get_policies by default, let's just query pg_policies
    const { data: policies, error: err } = await supabase.from('pg_policies').select('*').eq('tablename', 'transactions');
    console.log(policies || err);
}
checkRLS();
