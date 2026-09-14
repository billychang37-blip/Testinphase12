"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Key,
  CheckCircle2,
  MonitorSmartphone,
  Globe,
  AlertTriangle,
  Camera,
  KeyRound,
  Copy
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const [ipAddress, setIpAddress] = useState("Detecting...");
  const [deviceInfo, setDeviceInfo] = useState("Detecting...");

  // Editable states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [hasSoftToken, setHasSoftToken] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUserEmail(session.user.email || "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        const merged = { ...profileData, ...session.user.user_metadata };
        setProfile(merged);
        setFirstName(merged.first_name || "");
        setLastName(merged.last_name || "");
        setPhone(merged.phone || "");
        setAvatarUrl(merged.avatar_url || "");
      }

      // Check soft token
      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "soft_token_purchase")
        .eq("status", "completed");

      if (txs && txs.length > 0) {
        setHasSoftToken(true);
      }

      setLoading(false);
    };

    const fetchNetworkInfo = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIpAddress(data.ip);
      } catch (err) {
        setIpAddress("Unavailable");
      }
      
      const ua = window.navigator.userAgent;
      let os = "Unknown OS";
      if (ua.indexOf("Win") !== -1) os = "Windows";
      else if (ua.indexOf("Mac") !== -1) os = "MacOS";
      else if (ua.indexOf("Linux") !== -1) os = "Linux";
      else if (ua.indexOf("Android") !== -1) os = "Android";
      else if (ua.indexOf("like Mac") !== -1) os = "iOS";

      let browser = "Unknown Browser";
      if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
      else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
      else if (ua.indexOf("Safari") !== -1) browser = "Safari";
      else if (ua.indexOf("Edge") !== -1) browser = "Edge";

      setDeviceInfo(`${os} (${browser})`);
    };

    fetchUser();
    fetchNetworkInfo();
  }, [router]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMsg("");
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase.from('profiles').update({
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }).eq('id', session.user.id);
      
      if (!error) {
        setSaveMsg("Profile updated successfully!");
        window.dispatchEvent(new Event("profileUpdated"));
        setProfile({...profile, first_name: firstName, last_name: lastName, phone});
      } else {
        setSaveMsg("Failed to update profile.");
      }
    }
    setIsSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaveMsg("Uploading picture...");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const base64String = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
          const { error } = await supabase.auth.updateUser({ data: { avatar_url: base64String } });
          if (error) throw error;
          
          setAvatarUrl(base64String);
          setProfile({...profile, avatar_url: base64String});
          setSaveMsg("Picture updated successfully!");
          window.dispatchEvent(new Event("profileUpdated"));
        } catch (err) {
          setSaveMsg("Failed to upload picture.");
        }
        setTimeout(() => setSaveMsg(""), 3000);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#E81C24] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const initial = firstName ? firstName.charAt(0).toUpperCase() : "U";
  const kycStatus = profile?.kyc_status || 'unverified';
  const isKycApproved = kycStatus === 'approved';

  const generatedTokenCode = profile?.id ? Array.from(profile.id).reduce((acc: number, char: any) => acc + char.charCodeAt(0), 0).toString().padStart(6, '0').substring(0, 6) : "------";

  return (
    <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[1000px]">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage your profile, security preferences, and account settings.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-[280px] bg-gray-50/50 border-r border-gray-100 p-4 md:p-6 flex flex-col gap-2">
            <h2 className="text-[18px] font-bold text-gray-900 mb-4 px-2">Settings</h2>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14px] transition-all ${
                activeTab === 'profile' 
                  ? 'bg-white text-[#E81C24] shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <User className="w-5 h-5" />
              Profile Details
            </button>

            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14px] transition-all ${
                activeTab === 'security' 
                  ? 'bg-white text-[#E81C24] shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <Shield className="w-5 h-5" />
              Security & Passwords
            </button>

            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14px] transition-all ${
                activeTab === 'notifications' 
                  ? 'bg-white text-[#E81C24] shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>

            <button 
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14px] transition-all ${
                activeTab === 'billing' 
                  ? 'bg-white text-[#E81C24] shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </button>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-5 md:p-10">
            
            {activeTab === 'profile' && (
              <div className="animate-in fade-in duration-300 max-w-2xl">
                <h3 className="text-[20px] font-bold text-gray-900 mb-6">Profile Details</h3>
                
                {!isKycApproved && (
                  <div className="bg-[#FFF0F2] border border-red-100 rounded-2xl p-5 mb-8 flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <AlertTriangle className="w-5 h-5 text-[#E81C24]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#E81C24] mb-1">Identity Verification Required</h4>
                      <p className="text-[13px] text-red-900/80 mb-3 leading-relaxed">
                        To unlock full account limits and features, please complete your Know Your Customer (KYC) verification.
                      </p>
                      <button 
                        onClick={() => router.push('/dashboard/kyc')}
                        className="text-[13px] bg-[#E81C24] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#d41920] transition-colors"
                      >
                        Verify Identity Now
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-[32px] font-bold text-gray-400 overflow-hidden relative shadow-sm">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{initial}</span>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Persistent upload indicator for mobile/visibility */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer z-10 pointer-events-none text-gray-600">
                      <Camera className="w-4 h-4" />
                    </div>

                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      title="Upload new picture"
                    />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-bold text-gray-900">{profile?.full_name || "User"}</h4>
                    <p className="text-[14px] text-gray-500 font-medium">{userEmail}</p>
                    <div className="mt-2 flex gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${isKycApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {isKycApproved ? 'Verified Account' : 'Unverified Account'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-[14px] focus:border-[#E81C24] transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-[14px] focus:border-[#E81C24] transition-colors" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Email Address</label>
                    <input type="email" readOnly value={userEmail} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-[14px] bg-gray-50/50 text-gray-500 cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-[14px] focus:border-[#E81C24] transition-colors" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-[#E81C24] hover:bg-[#d41920] disabled:opacity-70 text-white font-bold py-3 px-4 md:px-8 rounded-xl transition-colors text-[14px] w-full md:w-auto"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  {saveMsg && (
                    <span className="text-[13px] font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">{saveMsg}</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-in fade-in duration-300 max-w-2xl">
                <h3 className="text-[20px] font-bold text-gray-900 mb-6">Security & Passwords</h3>
                
                <div className="space-y-6">
                  
                  {/* Soft Token Card */}
                  <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-gradient-to-r from-red-50/50 to-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-100 rounded-full opacity-50 blur-xl pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <KeyRound className="w-4 h-4 text-[#E81C24]" />
                      </div>
                      <h4 className="text-[15px] font-bold text-gray-900">Soft Token</h4>
                    </div>
                    
                    {hasSoftToken ? (
                      <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm inline-flex items-center gap-6">
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Your Token ID</p>
                          <p className="text-[20px] font-bold text-gray-900 tracking-widest font-mono">
                            {generatedTokenCode.substring(0,3)}-{generatedTokenCode.substring(3,6)}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedTokenCode);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                          title={isCopied ? "Copied!" : "Copy Token"}
                        >
                          {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[13px] text-gray-500 font-medium mb-3">You do not have an active Soft Token yet. It is required for authorizing outgoing transfers.</p>
                        <button 
                          onClick={() => router.push('/dashboard/soft-token')}
                          className="text-[13px] bg-white border border-gray-200 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          Activate Soft Token
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Current Session */}
                  <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-gray-50/30">
                    <h4 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#E81C24]" /> Current Active Session
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <MonitorSmartphone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Device</p>
                          <p className="text-[14px] font-bold text-gray-900">{deviceInfo}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">IP Address</p>
                          <p className="text-[14px] font-bold text-gray-900">{ipAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">Change Password</h4>
                      <p className="text-[13px] text-gray-500 font-medium">Update your password to keep your account secure.</p>
                    </div>
                    <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
                      Update Password
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[15px] font-bold text-gray-900">Two-Factor Authentication (2FA)</h4>
                        <span className="bg-green-100 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Enabled
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-medium">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
                      Manage 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'notifications' || activeTab === 'billing') && (
              <div className="animate-in fade-in duration-300 h-full flex flex-col items-center justify-center text-center opacity-60 py-20">
                <Key className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-[14px] text-gray-500 max-w-sm">This section is currently under development. Check back later for updates.</p>
              </div>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
}
