"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Wallet, Shield, User, Landmark, Building2, Smartphone } from "lucide-react";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      
      try {
        const res = await fetch(`/api/admin/users/${params.id}`, { cache: 'no-store' });
        const data = await res.json();
        
        if (!res.ok) {
          setErrorMsg(data.error || 'Failed to fetch user');
        } else if (data.profile) {
          setProfile(data.profile);
        } else {
          setErrorMsg('Profile data is missing');
        }
      } catch (err: any) {
        console.error(err);
        setErrorMsg(err.message || 'Network error');
      }
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Personal Info
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          phone: profile.phone,
          country: profile.country,
          address: profile.address,
          dob: profile.dob,
          
          // Account Info
          status: profile.status,
          account_type: profile.account_type,
          currency: profile.currency,
          account_number: profile.account_number,
          kyc_status: profile.kyc_status,
          
          // Balances
          wallet_balance: profile.wallet_balance,
          savings_balance: profile.savings_balance,
          btc_balance: profile.btc_balance,
          eth_balance: profile.eth_balance,
          usdt_erc20_balance: profile.usdt_erc20_balance,
          usdt_trc20_balance: profile.usdt_trc20_balance,
          usdt_bep20_balance: profile.usdt_bep20_balance,
          usdc_balance: profile.usdc_balance,
          
          // Credentials & Security
          soft_token: profile.soft_token,
          generated_user_id: profile.generated_user_id,
          generated_pin: profile.generated_pin,
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user');
      
      alert("User updated successfully!");
    } catch (err: any) {
      alert("Error updating user: " + err.message);
    }
    setSaving(false);
  };

  const handleChange = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8 text-[#333333]">Loading...</div>;
  if (errorMsg) return <div className="p-8 text-red-500 font-bold break-all">API ERROR: {errorMsg}</div>;
  if (!profile) return <div className="p-8 text-red-500 font-bold">User not found.</div>;

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-55px)] pb-20 font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin/members" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-lg font-bold text-gray-800">Edit User: {profile.first_name} {profile.last_name}</h2>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#2196F3] text-white px-5 py-2 rounded font-bold hover:bg-[#1976D2] transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Personal Details */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-3">
              <User className="w-5 h-5 text-[#2196F3]" />
              <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Personal Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">First Name</label>
                <input type="text" value={profile.first_name || ''} onChange={(e) => handleChange('first_name', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Last Name</label>
                <input type="text" value={profile.last_name || ''} onChange={(e) => handleChange('last_name', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Email Address</label>
                <input type="email" value={profile.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Phone Number</label>
                <input type="text" value={profile.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Date of Birth</label>
                <input type="date" value={profile.dob || ''} onChange={(e) => handleChange('dob', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Country</label>
                <input type="text" value={profile.country || ''} onChange={(e) => handleChange('country', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[#333] text-[13px] font-bold mb-1">Address</label>
                <input type="text" value={profile.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
            </div>
          </div>

          {/* Section 2: Account & Status */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-3">
              <Landmark className="w-5 h-5 text-[#2196F3]" />
              <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Account Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Account Number</label>
                <input type="text" value={profile.account_number || ''} onChange={(e) => handleChange('account_number', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Account Type</label>
                <select value={profile.account_type || ''} onChange={(e) => handleChange('account_type', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]">
                  <option value="">Select Type</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Savings">Savings Account</option>
                  <option value="Business">Business Account</option>
                  <option value="Offshore">Offshore Account</option>
                </select>
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Currency</label>
                <input type="text" value={profile.currency || 'USD'} onChange={(e) => handleChange('currency', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" placeholder="e.g. USD, EUR, GBP" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Login Status</label>
                <select value={profile.status || 'Active'} onChange={(e) => handleChange('status', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]">
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">KYC Status</label>
                <select value={profile.kyc_status || 'pending'} onChange={(e) => handleChange('kyc_status', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Fiat Balances */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-3">
              <Building2 className="w-5 h-5 text-[#2196F3]" />
              <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Fiat Balances</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Available Balance ({profile.currency || 'USD'})</label>
                <input type="number" step="0.01" value={profile.wallet_balance || 0} onChange={(e) => handleChange('wallet_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Savings Balance ({profile.currency || 'USD'})</label>
                <input type="number" step="0.01" value={profile.savings_balance || 0} onChange={(e) => handleChange('savings_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono focus:border-[#2196F3]" />
              </div>
            </div>
          </div>

          {/* Section 4: Crypto Settings */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-3">
              <Wallet className="w-5 h-5 text-[#2196F3]" />
              <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Crypto Balances & Wallet Addresses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              
              {/* BTC */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">Bitcoin (BTC)</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.00000001" value={profile.btc_balance || 0} onChange={(e) => handleChange('btc_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>

              {/* ETH */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">Ethereum (ETH)</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.00000001" value={profile.eth_balance || 0} onChange={(e) => handleChange('eth_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>

              {/* USDT ERC20 */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">Tether (USDT - ERC20)</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.01" value={profile.usdt_erc20_balance || 0} onChange={(e) => handleChange('usdt_erc20_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>

              {/* USDT TRC20 */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">Tether (USDT - TRC20)</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.01" value={profile.usdt_trc20_balance || 0} onChange={(e) => handleChange('usdt_trc20_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>

              {/* USDT BEP20 */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">Tether (USDT - BEP20)</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.01" value={profile.usdt_bep20_balance || 0} onChange={(e) => handleChange('usdt_bep20_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>

              {/* USDC */}
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-sm text-gray-700">USDC</h4>
                <div>
                  <label className="block text-[#555] text-xs font-bold mb-1">Balance</label>
                  <input type="number" step="0.01" value={profile.usdc_balance || 0} onChange={(e) => handleChange('usdc_balance', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono text-sm focus:border-[#2196F3]" />
                </div>
                
              </div>
            </div>
          </div>

          {/* Section 5: Credentials & Security */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-6 border-b pb-3">
              <Shield className="w-5 h-5 text-[#2196F3]" />
              <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Credentials & Security</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Generated User ID</label>
                <input type="text" value={profile.generated_user_id || ''} onChange={(e) => handleChange('generated_user_id', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1">Generated PIN / Password</label>
                <input type="text" value={profile.generated_pin || ''} onChange={(e) => handleChange('generated_pin', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2196F3]" />
              </div>
              <div>
                <label className="block text-[#333] text-[13px] font-bold mb-1 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-500" /> Soft Token (OTP)
                </label>
                <input type="text" value={profile.soft_token || ''} onChange={(e) => handleChange('soft_token', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 outline-none font-mono focus:border-[#2196F3]" placeholder="6-digit token code" />
              </div>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
