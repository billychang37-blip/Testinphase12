"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldAlert, CheckCircle, Search } from "lucide-react";

export default function IPConfigPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => 
    (u.first_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.last_ip || "").includes(search)
  );

  return (
    <div className="w-full animate-in fade-in duration-300 max-w-5xl">
      <div className="bg-white border border-[#4EA7F8] rounded-sm shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[#EAEAEA] flex justify-between items-center bg-[#3498db]">
          <h3 className="font-bold text-white text-[15px] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            IP Configuration & Security
          </h3>
        </div>

        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3 bg-white border border-gray-300 rounded px-3 py-2 w-full max-w-md shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by IP address, name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#f0f2f5] border-y border-gray-200 text-gray-500 text-[11px] font-bold tracking-wider">
              <th className="px-5 py-3 w-1/4">USER</th>
              <th className="px-5 py-3 w-1/4">EMAIL</th>
              <th className="px-5 py-3 w-1/4">LAST KNOWN IP</th>
              <th className="px-5 py-3 w-1/4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500">Loading data...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500">No records found.</td></tr>
            ) : (
              filteredUsers.map((u, idx) => (
                <tr key={u.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} border-b border-gray-100 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors`}>
                  <td className="px-5 py-4">{u.first_name} {u.last_name}</td>
                  <td className="px-5 py-4 text-gray-500">{u.email}</td>
                  <td className="px-5 py-4 font-mono text-blue-600 font-bold">{u.last_ip || "N/A (Run SQL)"}</td>
                  <td className="px-5 py-4">
                    {u.status === 'blocked' ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center w-max gap-1">
                        <ShieldAlert className="w-3 h-3" /> Blocked
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center w-max gap-1">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
