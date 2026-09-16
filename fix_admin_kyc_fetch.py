import re

with open('src/app/admin/kyc/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_fetch = """  const fetchRequests = async () => {
    // We join with profiles to get the user name and email
    const { data: txs, error } = await supabase
      .from('transactions')
      .select('id, user_id, status, description, created_at, profiles!inner(first_name, last_name, email)')
      .eq('type', 'kyc_request')
      .order('created_at', { ascending: false });

    if (txs && !error) {
      setRequests(txs);
    }
    setLoading(false);
  };"""

new_fetch = """  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/kyc');
      if (res.ok) {
        const data = await res.json();
        if (data.requests) {
          setRequests(data.requests);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };"""

content = content.replace(old_fetch, new_fetch)

with open('src/app/admin/kyc/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated admin KYC page to use API")
