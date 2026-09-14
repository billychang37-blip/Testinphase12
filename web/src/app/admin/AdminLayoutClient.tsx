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
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

      setIsAdmin(true);
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
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  if (loading) return <div className="h-screen w-full flex items-center justify-center">Loading admin panel...</div>;

  return (
    <div className="admin-mobile-scaler bg-gray-100 min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .admin-mobile-scaler > div {
            transform: scale(calc(100vw / 1024));
            transform-origin: top left;
            width: 1024px;
            height: calc(100vh / (100vw / 1024));
          }
        }
      `}} />
      <div className="flex h-screen bg-gray-100 font-sans min-w-[1024px]">
      
      {/* Sidebar - Desktop */}
      <aside className="flex flex-col w-64 bg-[#2A2A2A] text-gray-300 h-full shadow-xl overflow-y-auto">
        <div className="p-5 border-b border-gray-700 bg-[#222222]">
          <h2 className="text-xl font-bold text-white tracking-wider uppercase">Super Admin</h2>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${isActive ? 'bg-[#3A3A3A] text-white border-l-4 border-[#3498db]' : 'hover:bg-[#333333] hover:text-white'}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-[#34495e] flex items-center justify-between px-6 shadow-md z-10 shrink-0">
          <div className="flex items-center text-white">
            <button className="hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-semibold hidden block text-lg">Admin Control Panel</h1>
          </div>
          <div className="flex items-center gap-4 text-white">
            <button className="hover:text-gray-300 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ml-2 cursor-pointer border-2 border-transparent hover:border-white transition-colors">
              <img src="/default-avatar.png" alt="Admin" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Admin&background=random')} />
            </div>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="hover:text-red-400 transition-colors ml-2"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F4F6F8] p-6 relative">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="relative w-64 bg-[#2A2A2A] text-gray-300 h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left">
            <div className="p-5 border-b border-gray-700 bg-[#222222] flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-wider uppercase">Super Admin</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-5 h-5 text-white" /></button>
            </div>
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${isActive ? 'bg-[#3A3A3A] text-white border-l-4 border-[#3498db]' : 'hover:bg-[#333333] hover:text-white'}`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </div>
    </div>
  );
}
