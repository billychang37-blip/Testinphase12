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
    { name: "User Private Key", href: "#", icon: Key },
    { name: "KYC", href: "/admin/kyc", icon: FileCheck },
    { name: "Add Funds", href: "/admin/add-funds", icon: PlusCircle },
    { name: "Manage Deposits", href: "/admin/deposits", icon: ArrowDownToLine },
    { name: "Manage Transfer", href: "/admin/transfers", icon: ArrowUpFromLine },
    { name: "Virtual Card", href: "#", icon: Wallet },
    { name: "Wallet Connect", href: "#", icon: Network },
    { name: "Manage User", href: "#", icon: Users },
    { name: "Manage Internal Transfer", href: "#", icon: ArrowRightLeft },
    { name: "Email", href: "#", icon: Mail },
    { name: "IP Config", href: "#", icon: Repeat },
    { name: "Custom Pages", href: "#", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  if (loading) return <div className="h-screen w-full bg-[#f4f6f9] flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans min-w-[1200px] overflow-x-hidden">
      
      {/* Sidebar - strict desktop */}
      {sidebarOpen && (
        <aside className="flex flex-col w-[250px] bg-[#222222] text-[#999999] h-full shadow-xl overflow-y-auto shrink-0 transition-all duration-300">
          <div className="p-5 h-16 border-b border-[#333333] flex items-center justify-center">
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
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
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
            <button className="hover:text-gray-300 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="hover:text-gray-300 transition-colors relative">
              <Mail className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden cursor-pointer border border-gray-400">
              <img src="/default-avatar.png" alt="Admin" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Admin&background=random')} />
            </div>
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
        <main className="flex-1 overflow-y-auto p-4 relative">
          {children}
          
          <div className="mt-8 text-center text-[11px] text-blue-500 mb-4 font-semibold">
            Copyright ©2026 All rights reserved | Cryptocathedral
          </div>
        </main>
      </div>

    </div>
  );
}
