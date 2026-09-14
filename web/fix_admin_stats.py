import re

with open('src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fetchDashboardData
old_fetch = '''const fetchDashboardData = async () => {
      // Fetch users
      const { data: users, error } = await supabase.from('profiles').select('kyc_status');
      
      if (users && !error) {
        let active = 0, blocked = 0, suspended = 0, pending = 0;
        users.forEach(u => {
          if (u.kyc_status === 'approved') active++;
          else if (u.kyc_status === 'rejected') blocked++;
          else pending++;
        });
        
        // As a mock for the specific structure, we'll map them like this:
        setStats({
          activeUsers: active || users.length, 
          blockedUsers: blocked,
          suspendedUsers: suspended,
          pendingKYC: pending
        });
      }

      // Fetch transactions
      const { data: txs } = await supabase.from('transactions').select('type, amount');
      
      if (txs) {
        let depFiat = 0, wFiat = 0, depCrypt = 0, wCrypt = 0;
        
        txs.forEach(t => {
          if (t.type === 'deposit') depFiat += Number(t.amount);
          if (t.type === 'transfer' || t.type === 'internal_transfer') wFiat += Number(t.amount);
          if (t.type === 'crypto_deposit') depCrypt += Number(t.amount);
          if (t.type === 'crypto_withdrawal') wCrypt += Number(t.amount);
        });

        setTxStats({
          depositsFiat: depFiat,
          withdrawalsFiat: wFiat,
          depositsCrypto: depCrypt,
          withdrawalsCrypto: wCrypt
        });
      }
      
      setLoading(false);
    };'''

new_fetch = '''const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        const users = data.users || [];
        
        const { data: txs } = await supabase.from('transactions').select('type, amount, status');
        let pending = 0;
        let depFiat = 0, wFiat = 0, depCrypt = 0, wCrypt = 0;
        
        if (txs) {
          txs.forEach(t => {
            if (t.type === 'kyc_request' && t.status === 'pending') pending++;
            
            if (t.type === 'deposit') depFiat += Number(t.amount);
            if (t.type === 'transfer' || t.type === 'domestic_transfer' || t.type === 'international_transfer') wFiat += Number(t.amount);
            if (t.type === 'crypto_deposit') depCrypt += Number(t.amount);
            if (t.type === 'crypto_withdrawal' || t.type === 'crypto_transfer') wCrypt += Number(t.amount);
          });
        }
        
        setStats({
          activeUsers: users.length, 
          blockedUsers: 0,
          suspendedUsers: 0,
          pendingKYC: pending
        });

        setTxStats({
          depositsFiat: depFiat,
          withdrawalsFiat: wFiat,
          depositsCrypto: depCrypt,
          withdrawalsCrypto: wCrypt
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };'''

content = content.replace(old_fetch, new_fetch)

with open('src/app/admin/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated admin dashboard fetching")
