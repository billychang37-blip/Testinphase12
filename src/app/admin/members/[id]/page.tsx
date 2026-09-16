"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function MemberDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!params.id) return;
      
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const data = await res.json();
          const user = data.users.find((u: any) => u.id === params.id);
          
          if (user) {
            const { data: dbProfile } = await supabase.from('profiles').select('*').eq('id', params.id).single();
            setProfile({ ...dbProfile, ...user, ...user.user_metadata });
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, [params.id]);

  if (loading) return <div className="p-10 font-bold text-center">Loading User Details...</div>;
  if (!profile) return <div className="p-10 font-bold text-center text-red-500">User not found</div>;

  return (
    <div className="p-6 bg-white min-h-full font-sans">
      
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:underline font-bold mb-6 text-[14px]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Members
      </button>

      <h1 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b border-gray-300 pb-2">User Details - {profile.first_name} {profile.last_name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Personal Info */}
        <div className="border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-[#1a8cff] px-4 py-3 flex items-center text-white border-b-[4px] border-black">
            <User className="w-5 h-5 mr-3" />
            <h2 className="text-sm font-bold tracking-widest uppercase">Personal Information</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{profile.first_name} {profile.last_name}</h3>
                <p className="text-gray-500 text-sm">{profile.email}</p>
                <div className="mt-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white ${profile.kyc_status === 'approved' || profile.kyc_status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}>
                    KYC: {profile.kyc_status || 'Unverified'}
                  </span>
                </div>
              </div>
            </div>
            
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Phone Number</td>
                  <td className="py-3 text-gray-900 font-semibold">{profile.phone || profile.phone_number || 'N/A'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Country</td>
                  <td className="py-3 text-gray-900 font-semibold">{profile.country || 'N/A'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">State/City</td>
                  <td className="py-3 text-gray-900 font-semibold">{profile.state || 'N/A'} / {profile.city || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-500 font-bold w-1/3">Address</td>
                  <td className="py-3 text-gray-900 font-semibold">{profile.address || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Info */}
        <div className="border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-[#1a8cff] px-4 py-3 flex items-center text-white border-b-[4px] border-black">
            <Wallet className="w-5 h-5 mr-3" />
            <h2 className="text-sm font-bold tracking-widest uppercase">Financial Information</h2>
          </div>
          <div className="p-5">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Account Number</td>
                  <td className="py-3 text-gray-900 font-mono font-bold text-lg">{profile.account_number || 'N/A'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Main Balance</td>
                  <td className="py-3 text-gray-900 font-bold text-green-600 text-lg">
                    {profile.currency || '$'} {Number(profile.wallet_balance || 0).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Total Assets</td>
                  <td className="py-3 text-gray-900 font-bold text-blue-600">
                    {profile.currency || '$'} {Number(profile.total_assets || 0).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 font-bold w-1/3">Soft Token</td>
                  <td className="py-3 text-gray-900 font-mono font-bold tracking-widest">
                    {profile.soft_token || 'NOT SET'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-500 font-bold w-1/3">Pin Code</td>
                  <td className="py-3 text-gray-900 font-mono font-bold tracking-widest">
                    {profile.pin || 'NOT SET'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
