"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  FileCheck, 
  PlusCircle, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Wallet, 
  Repeat, 
  ArrowRightLeft, 
  Mail, 
  Network, 
  FileText, 
  Settings,
  LogOut
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      
      const { data: profile } = await supabase.from('profiles').select('account_type').eq('id', session.user.id).single();
      if (profile?.account_type !== 'admin') {
        router.push("/dashboard");
        return;
      }
      setLoading(false);
    };
    checkAdmin();
  }, [router]);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Members", href: "/admin/members", icon: Users },
    { name: "KYC Applications", href: "/admin/kyc", icon: FileCheck },
    { name: "Fund Accounts", href: "/admin/add-funds", icon: PlusCircle },
    { name: "Manage Deposits", href: "/admin/deposits", icon: ArrowDownToLine },
    { name: "Manage Transfers", href: "/admin/transfers", icon: ArrowUpFromLine },
    { name: "Manage Savings", href: "/admin/savings", icon: Wallet },
    { name: "Soft Tokens", href: "/admin/soft-tokens", icon: Key },
    { name: "IP Config", href: "/admin/ip-config", icon: Repeat },
    { name: "Settings", href: "/admin/profile", icon: Settings },
  ];

  if (loading) return <div className="h-screen w-full bg-[#f4f6f9] flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-[#f4f6f9] font-sans min-w-[980px]">
      
      {/* Sidebar - strict desktop */}
      {sidebarOpen && (
        <aside className="flex flex-col w-[250px] bg-[#222222] text-[#999999] shadow-xl shrink-0 transition-all duration-300">
          <div className="p-5 h-[55px] border-b border-[#333333] flex items-center justify-center">
             {/* Empty logo area like reference */}
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-4 px-6 py-3 text-[13px] transition-colors hover:text-white ${isActive ? 'text-white bg-[#1a1a1a]' : ''}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      <span className="ml-auto text-[10px]">›</span>
                    </Link>
                    {/* Subtle divider */}
                    <div className="h-[1px] bg-[#2a2a2a] w-full" />
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-[55px] bg-[#424242] flex items-center justify-between px-6 shadow-md shrink-0 border-b border-gray-600">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-gray-300 transition-colors p-1 border border-white rounded-sm flex items-center justify-center bg-[#333]"
            >
              <div className="flex flex-col gap-1 w-5 h-4 justify-center items-center">
                <span className="w-4 h-[2px] bg-white"></span>
                <span className="w-4 h-[2px] bg-white"></span>
                <span className="w-4 h-[2px] bg-white"></span>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-5 text-white">
            <Link href="/admin/profile" className="hover:text-gray-300 transition-colors">
              <Settings className="w-4 h-4" />
            </Link>
            <button className="hover:text-gray-300 transition-colors relative">
              <Mail className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/admin/profile" className="w-8 h-8 rounded-full bg-white overflow-hidden cursor-pointer border border-gray-400 block">
              <img src="/admin-avatar.png" alt="Admin" className="w-full h-full object-cover" />
            </Link>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="hover:text-red-400 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex flex-col p-4 relative">
          <div>
            {children}
          </div>
          
          <div className="mt-auto pt-8 text-center text-[11px] text-blue-500 mb-2 font-semibold">
            Copyright © 2026 All rights reserved
          </div>
        </main>
      </div>

    </div>
  );
}
