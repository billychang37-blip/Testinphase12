"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    phone: '',
    status: 'Active',
    country: '',
    state: '',
    recovery_phrase: '',
    transfer_fee: 0,
    swift_pin: '',
    password: ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // In a real implementation this requires a secure Admin API route to bypass Supabase Auth constraints.
      // We will attempt to insert a profile directly for demonstration, but auth.signUp is needed for real login.
      alert("Note: This will only create a profile record. Creating a full auth user requires a secure API route.");
      const { error } = await supabase.from('profiles').insert([
        {
          email: profile.email,
          first_name: profile.first_name,
          phone: profile.phone,
          status: profile.status,
          country: profile.country,
          state: profile.state,
          recovery_phrase: profile.recovery_phrase,
          transfer_fee: profile.transfer_fee,
          swift_pin: profile.swift_pin,
          generated_pin: profile.password
        }
      ]);
      
      if (error) throw error;
      alert("User added successfully!");
      router.push("/admin/members");
    } catch (err: any) {
      alert("Error adding user: " + err.message);
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
        <div className="bg-white text-[#333333] px-4 py-2 text-[13px] font-bold tracking-wide uppercase border-t border-l border-r border-gray-300 border-b-transparent relative top-[1px]">
          Add New Users
        </div>
        <Link 
          href="/admin/members" 
          className="bg-[#2196F3] text-white px-4 py-2 text-[13px] font-bold tracking-wide uppercase border border-[#2196F3] border-l-0 hover:bg-[#1976D2] transition-colors"
        >
          Manage Users
        </Link>
      </div>

      <div className="p-6">
        <h2 className="text-[15px] font-bold text-[#333333] uppercase tracking-wide mb-8 flex items-center">
          ADD USERS <span className="text-red-500 ml-1">-</span>
        </h2>

        <form onSubmit={handleSave}>
          <div className="flex justify-between items-center mb-6">
            <button type="button" disabled className="opacity-50 bg-white border border-gray-300 px-4 py-2 rounded text-sm text-[#333333] shadow-sm font-semibold cursor-not-allowed">
              Open User's Account
            </button>
            <button type="button" disabled className="opacity-50 bg-red-600 text-white px-5 py-2 rounded text-sm font-semibold shadow-sm cursor-not-allowed">
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
                  value={profile.email}
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
                value={profile.first_name}
                onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
                required
              />
            </div>
            
            {/* Initial Password */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">
                Initial Password : <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={profile.password}
                onChange={(e) => setProfile({...profile, password: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">Phone :</label>
              <input 
                type="text" 
                value={profile.phone}
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
                value={profile.status}
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
                value={profile.country}
                onChange={(e) => setProfile({...profile, country: e.target.value})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">State :</label>
              <input 
                type="text" 
                value={profile.state}
                onChange={(e) => setProfile({...profile, state: e.target.value})}
                placeholder="Select State"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
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
                  value={profile.recovery_phrase}
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
                value={profile.transfer_fee}
                onChange={(e) => setProfile({...profile, transfer_fee: Number(e.target.value)})}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
              />
            </div>

            {/* Swift Pin */}
            <div>
              <label className="block text-[#333333] text-[13px] font-bold mb-1">One Time Use Swift Pin :</label>
              <input 
                type="text" 
                value={profile.swift_pin}
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

      </div>
    </div>
  );
}
