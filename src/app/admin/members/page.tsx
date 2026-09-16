"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMembersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Failed to fetch members", err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading members...</div>;

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mb-8">
        <div className="bg-[#3498db] text-white px-4 py-3 border-b-4 border-black flex justify-between items-center">
          <h3 className="font-bold tracking-widest text-sm uppercase">Manage Members</h3>
          <span className="text-xs font-bold bg-black/20 px-2 py-1 rounded">{users.length} Total</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EAEAEA] border-b border-gray-300 text-xs uppercase tracking-widest text-gray-700">
                <th className="p-3 border-r border-white font-bold">Name</th>
                <th className="p-3 border-r border-white font-bold">Email</th>
                <th className="p-3 border-r border-white font-bold">Account #</th>
                <th className="p-3 border-r border-white font-bold">Status</th>
                <th className="p-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 text-sm">No members found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium border-r border-gray-100">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3 text-sm border-r border-gray-100">{user.email}</td>
                    <td className="p-3 text-sm border-r border-gray-100 font-mono">{user.account_number || 'N/A'}</td>
                    <td className="p-3 text-sm border-r border-gray-100">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.kyc_status === 'approved' ? 'bg-green-100 text-green-700' : 
                        user.kyc_status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.kyc_status || 'pending'}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <Link href={`/admin/members/${user.id}`} className="inline-block bg-[#3498db] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#2980b9] transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
