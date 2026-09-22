"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMembersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePins, setVisiblePins] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', { cache: 'no-store' });
        const data = await res.json();
        if (data.users) {
          // Filter out admins if you only want to see normal users, 
          // or leave them to match the "199 users" vibe. Let's keep all except the current admin maybe? 
          // Actually, we'll just show everyone.
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Failed to fetch members", err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const togglePin = (userId: string) => {
    setVisiblePins(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  if (loading) return <div className="p-8 text-[#333333]">Loading...</div>;

  return (
    <div className="w-full bg-white min-h-[calc(100vh-130px)] shadow-sm relative pb-20">
      
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
          className="bg-[#2196F3] text-white px-4 py-2 text-[13px] font-bold tracking-wide uppercase border-t border-b border-r border-[#2196F3] hover:bg-[#1976D2] transition-colors"
        >
          Add New Users
        </Link>
        <div className="bg-white text-[#333333] px-4 py-2 text-[13px] font-bold tracking-wide uppercase border-t border-l border-r border-gray-300 border-b-transparent relative top-[1px]">
          Manage Users
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-[15px] font-bold text-[#333333] uppercase tracking-wide mb-6 flex items-center">
          MANAGE USERS <span className="text-red-500 ml-1">-</span>
        </h2>

        {/* Filter Box */}
        <div className="mb-6">
          <label className="block text-[#333333] font-bold mb-2">Filter:</label>
          <div className="bg-[#b3b3b3] p-2">
            <select className="w-full bg-white border border-gray-300 p-1.5 text-sm outline-none">
              <option>All</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="border border-[#2196F3] rounded-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#2196F3] text-white px-4 py-2.5 font-bold tracking-wide flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center text-[10px]">■</div>
            Selected Users [{users.length}]
          </div>
          <div className="h-2 bg-black w-full" />
          <div className="h-[2px] bg-[#2196F3] w-full" />

          {/* Table */}
          <div className="bg-white p-2 overflow-x-auto">
            {/* Add New User Button */}
            <div className="mb-2">
              <Link 
                href="/admin/members/add"
                className="bg-[#333333] text-white px-4 py-1.5 text-xs font-bold rounded-sm inline-block rounded-t-lg rounded-b-none"
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              >
                Add New User
              </Link>
            </div>

            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
              <thead>
                <tr className="bg-[#EAEAEA] text-[#333333] text-xs uppercase font-bold">
                  <th className="p-2 border border-gray-300 w-8 text-center">#</th>
                  <th className="p-2 border border-gray-300 w-8 text-center"><input type="checkbox" /></th>
                  <th className="p-2 border border-gray-300 text-center"></th> {/* Action column */}
                  <th className="p-2 border border-gray-300">Username <span className="text-[9px]">▲▼</span></th>
                  <th className="p-2 border border-gray-300">Email <span className="text-[9px]">▲▼</span></th>
                  <th className="p-2 border border-gray-300 text-center">Account ID</th>
                  <th className="p-2 border border-gray-300 text-center">Phone</th>
                  <th className="p-2 border border-gray-300 text-center">Created <span className="text-[9px]">▲▼</span></th>
                  <th className="p-2 border border-gray-300 text-center">Upline</th>
                  <th className="p-2 border border-gray-300 text-center">Status</th>
                  <th className="p-2 border border-gray-300 text-center">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-4 text-center text-red-500 font-bold text-sm bg-red-50">—No Data Found—</td>
                  </tr>
                ) : (
                  users.map((u, index) => (
                    <tr key={u.id} className="text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-200">
                      <td className="p-2 text-center border-l border-r border-gray-200">{index + 1}</td>
                      <td className="p-2 text-center border-r border-gray-200"><input type="checkbox" /></td>
                      <td className="p-2 text-center border-r border-gray-200">
                        <Link 
                          href={`/admin/members/${u.id}`}
                          className="bg-[#337ab7] text-white px-3 py-1 text-xs font-bold rounded shadow-sm hover:bg-[#286090]"
                        >
                          Manage
                        </Link>
                      </td>
                      <td className="p-2 border-r border-gray-200">{u.first_name} {u.last_name || ''}</td>
                      <td className="p-2 border-r border-gray-200 text-blue-600 underline">
                        {u.email}
                      </td>
                      <td className="p-2 text-center border-r border-gray-200 font-mono">{u.generated_user_id || u.account_number || 'N/A'}</td>
                      <td className="p-2 text-center border-r border-gray-200 text-blue-600 underline">{u.phone || '-'}</td>
                      <td className="p-2 text-center border-r border-gray-200">{formatDate(u.created_at)}</td>
                      <td className="p-2 text-center border-r border-gray-200">-</td>
                      <td className="p-2 text-center border-r border-gray-200">{u.status || 'Active'}</td>
                      <td className="p-2 text-center border-r border-gray-200 font-mono">
                        {visiblePins[u.id] ? (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">{u.generated_pin || 'Not Set'}</span>
                        ) : (
                          <button 
                            onClick={() => togglePin(u.id)}
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            Show
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-white p-2 text-center text-blue-500 text-[11px] font-semibold border-t border-gray-200">
            Copyright © 2026 All rights reserved
          </div>
        </div>

      </div>
    </div>
  );
}
