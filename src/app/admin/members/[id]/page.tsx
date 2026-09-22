"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [transfers, setTransfers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      
      try {
        const res = await fetch(`/api/admin/users/${params.id}`, { cache: 'no-store' });
        const data = await res.json();
        
        if (data.profile) {
          setProfile(data.profile);
        }
        
        if (data.transactions) {
          setDeposits(data.transactions.filter((t: any) => t.type === 'deposit'));
          setTransfers(data.transactions.filter((t: any) => t.type === 'transfer' || t.type === 'crypto_transfer' || t.type === 'withdrawal'));
        }
      } catch (err) {
        console.error(err);
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
          email: profile.email,
          first_name: profile.first_name,
          phone: profile.phone,
          status: profile.status,
          country: profile.country,
          state: profile.state,
          recovery_phrase: profile.recovery_phrase,
          transfer_fee: profile.transfer_fee,
          swift_pin: profile.swift_pin
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

  const generateRecoveryPhrase = () => {
    const words = ["Cactus", "Nautical", "Zenith", "Terrarium", "Lilac", "Earring", "Seashell", "Carpet", "Icy", "Lively", "Grapes", "Twitter", "Ocean", "River", "Mountain", "Cloud", "Storm", "Breeze", "Flame", "Shadow"];
    let phrase = [];
    for (let i = 0; i < 12; i++) {
      phrase.push(words[Math.floor(Math.random() * words.length)]);
    }
    setProfile({ ...profile, recovery_phrase: phrase.join(' ') });
  };

  if (loading) return <div className="p-8 text-[#333333]">Loading...</div>;
  if (!profile) return <div className="p-8 text-red-500 font-bold">User not found.</div>;

  return (
    <div className="w-full bg-white min-h-[calc(100vh-130px)] shadow-sm relative pb-20 font-sans">
      
      {/* Top Tabs (Matching Reference) */}
      <div className="flex border-b border-gray-300 pt-6 px-6">
        <Link 
          href="/admin/profile" 
          className="bg-[#2196F3] text-white px-4 py-2 text-[13px] font-bold tracking-wide uppercase border border-[#2196F3] hover:bg-[#1976D2] transition-colors"
        >
          Manage Admin Profile
        </Link>
        <Link 
          href="/admin/members/add" 
          className="bg-[#2196F3] text-white px-4 py-2 text-[13px] font-bold tracking-wide uppercase border-t border-b border-[#2196F3] hover:bg-[#1976D2] transition-colors"
        >
          Add New Users
        </Link>
        <Link 
          href="/admin/members" 
          className="bg-[#2196F3] text-white px-4 py-2 text-[13px] font-bold tracking-wide uppercase border border-[#2196F3] hover:bg-[#1976D2] transition-colors"
        >
          Manage Users
        </Link>
      </div>

      <div className="p-6">
        <h2 className="text-[15px] font-bold text-[#333333] uppercase tracking-wide mb-8 flex items-center">
          EDIT USER <span className="text-red-500 ml-1">-</span>
        </h2>

        <form onSubmit={handleSave}>
          <div className="flex justify-between items-center mb-6">
            <button type="button" className="bg-white border border-gray-300 px-4 py-2 rounded text-sm text-[#333333] hover:bg-gray-50 shadow-sm font-semibold">
              Open User's Account
            </button>
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-semibold shadow-sm">
              Delete
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {/* Email */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Email : <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={profile.email || ''}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
                  required
                />
                <span className="absolute right-3 top-2.5 text-gray-400">👤</span>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Username : <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={profile.first_name || ''}
                onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">Phone :</label>
              <input 
                type="text" 
                value={profile.phone || ''}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Status : <span className="text-red-500">*</span>
              </label>
              <select 
                value={profile.status || 'Active'}
                onChange={(e) => setProfile({...profile, status: e.target.value})}
                className="w-full bg-[#EAEAEA] border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none"
              >
                <option value="Active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">Country :</label>
              <input 
                type="text" 
                value={profile.country || ''}
                onChange={(e) => setProfile({...profile, country: e.target.value})}
                className="w-full bg-[#EAEAEA] border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">State :</label>
              <input 
                type="text" 
                value={profile.state || ''}
                onChange={(e) => setProfile({...profile, state: e.target.value})}
                placeholder="Select State"
                className="w-full bg-[#EAEAEA] border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none"
              />
            </div>

            {/* Enable 2FA */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Enable 2FA : <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full bg-[#EAEAEA] border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none"
              >
                <option>False</option>
                <option>True</option>
              </select>
            </div>

            {/* Recovery Phrase */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Recovery Phrase : <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea 
                  value={profile.recovery_phrase || ''}
                  onChange={(e) => setProfile({...profile, recovery_phrase: e.target.value})}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3] min-h-[60px]"
                />
                <button 
                  type="button"
                  onClick={generateRecoveryPhrase}
                  className="absolute bottom-2 right-2 bg-[#666666] text-white text-[10px] px-2 py-1 rounded-sm uppercase tracking-wide font-bold"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Bank Transfer Fee */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Bank Transfer Conversion Fee (%) <span className="text-red-500 text-[10px] font-normal">(Will override General Settings Fee)</span> :
              </label>
              <input 
                type="number" 
                value={profile.transfer_fee || 0}
                onChange={(e) => setProfile({...profile, transfer_fee: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
              />
            </div>

            {/* Swift Pin */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">One Time Use Swift Pin :</label>
              <input 
                type="text" 
                value={profile.swift_pin || 0}
                onChange={(e) => setProfile({...profile, swift_pin: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button 
              type="submit"
              disabled={saving}
              className="bg-[#26B99A] hover:bg-[#1f997f] text-white px-12 py-2.5 rounded text-sm font-semibold shadow-sm"
            >
              {saving ? 'Saving...' : 'Submit'}
            </button>
            <button 
              type="button"
              onClick={() => router.back()}
              className="bg-white border border-gray-300 px-12 py-2.5 rounded text-sm text-[#333333] hover:bg-gray-50 shadow-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Lower Tables */}
        <div className="border border-[#2196F3] rounded bg-white p-4 mb-6 text-center text-lg font-bold text-[#2196F3] shadow-sm">
          Withdrawable Balance: <span className="text-red-500">${Number(profile.wallet_balance || 0).toLocaleString()}</span>
        </div>

        {/* Deposits Table */}
        <div className="border border-[#2196F3] rounded shadow-sm mb-6 overflow-hidden">
          <div className="bg-[#2196F3] text-white px-4 py-2 font-bold tracking-wide flex items-center gap-2">
            <div className="w-3 h-3 border border-white rounded-sm flex items-center justify-center text-[8px] bg-white text-[#2196F3]">■</div>
            Deposits
          </div>
          <div className="h-1 bg-black w-full" />
          <div className="h-1 bg-[#2196F3] w-full" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[#F9F9F9] text-[#333333] font-bold text-xs uppercase border-b border-gray-200">
                  <th className="p-2 text-center">#</th>
                  <th className="p-2">Medium</th>
                  <th className="p-2">Medium ID</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-red-500 font-bold bg-[#ffe6e6] text-sm">—No Data Found—</td>
                  </tr>
                ) : (
                  deposits.map((d, i) => (
                    <tr key={d.id} className="border-b border-gray-200">
                      <td className="p-2 text-center">{i+1}</td>
                      <td className="p-2">{d.asset?.toUpperCase()}</td>
                      <td className="p-2 text-xs text-gray-500">{d.id}</td>
                      <td className="p-2 text-center">{d.amount}</td>
                      <td className="p-2 text-center">{d.status}</td>
                      <td className="p-2 text-center">{new Date(d.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transfers Table */}
        <div className="border border-[#2196F3] rounded shadow-sm mb-6 overflow-hidden">
          <div className="bg-[#2196F3] text-white px-4 py-2 font-bold tracking-wide flex items-center gap-2">
            <div className="w-3 h-3 border border-white rounded-sm flex items-center justify-center text-[8px] bg-white text-[#2196F3]">■</div>
            Transfers
          </div>
          <div className="h-1 bg-black w-full" />
          <div className="h-1 bg-[#2196F3] w-full" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[#F9F9F9] text-[#333333] font-bold text-xs uppercase border-b border-gray-200">
                  <th className="p-2 text-center">#</th>
                  <th className="p-2">Medium</th>
                  <th className="p-2">Medium ID</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Fee</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-center">Date Requested</th>
                </tr>
              </thead>
              <tbody>
                {transfers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-red-500 font-bold bg-[#ffe6e6] text-sm">—No Data Found—</td>
                  </tr>
                ) : (
                  transfers.map((t, i) => (
                    <tr key={t.id} className="border-b border-gray-200">
                      <td className="p-2 text-center">{i+1}</td>
                      <td className="p-2">{t.asset?.toUpperCase()}</td>
                      <td className="p-2 text-xs text-gray-500">{t.id}</td>
                      <td className="p-2 text-center">{t.amount}</td>
                      <td className="p-2 text-center">0.00</td>
                      <td className="p-2 text-center">{t.status}</td>
                      <td className="p-2 text-center">{new Date(t.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Logins Table */}
        <div className="border border-[#2196F3] rounded shadow-sm overflow-hidden mb-6">
          <div className="bg-[#2196F3] text-white px-4 py-2 font-bold tracking-wide flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white rounded-sm flex items-center justify-center text-[8px] bg-white text-[#2196F3]">■</div>
              User Logins <span className="font-normal text-xs ml-1">(Not required)</span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded-sm shadow-sm">
              Clear All
            </button>
          </div>
          <div className="h-1 bg-black w-full" />
          <div className="h-1 bg-[#2196F3] w-full" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[#F9F9F9] text-[#333333] font-bold text-xs uppercase border-b border-gray-200">
                  <th className="p-2 text-center">#</th>
                  <th className="p-2">IP Address</th>
                  <th className="p-2">Country</th>
                  <th className="p-2">Browser</th>
                  <th className="p-2">Platform</th>
                  <th className="p-2">Version Number</th>
                  <th className="p-2 text-right">Last Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">1</td>
                  <td className="p-2 font-mono text-blue-600">{profile.last_ip || 'N/A'}</td>
                  <td className="p-2">{profile.last_country || 'N/A'}</td>
                  <td className="p-2">Chrome</td>
                  <td className="p-2">Windows</td>
                  <td className="p-2">120.0</td>
                  <td className="p-2 text-right">{profile.last_active_at ? new Date(profile.last_active_at).toLocaleString() : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
