import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add notifications state
if 'const [notifications, setNotifications]' not in content:
    content = content.replace(
        'const [isNotifOpen, setIsNotifOpen] = useState(false);',
        'const [isNotifOpen, setIsNotifOpen] = useState(false);\n  const [notifications, setNotifications] = useState<any[]>([]);\n  const [unreadCount, setUnreadCount] = useState(0);'
    )

# Add useEffect for welcome notification
effect_regex = re.compile(r'(const fetchUser = async \(\) => \{.*?\};\s*fetchUser\(\);\s*\}, \[router\]\);)', re.DOTALL)

new_effect = '''\g<1>

  useEffect(() => {
    if (profile) {
      const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
      if (!hasSeenWelcome) {
        const welcomeNotif = {
          id: Date.now(),
          title: "Login Successful",
          message: `Welcome back, ${profile.first_name || 'User'}! You have securely logged in.`,
          time: "Just now",
          read: false
        };
        setNotifications([welcomeNotif]);
        setUnreadCount(1);
        sessionStorage.setItem("hasSeenWelcome", "true");
        
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(e => console.log("Audio play blocked by browser:", e));
        } catch (e) {}
      }
    }
  }, [profile]);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
    setUnreadCount(0);
  };
'''
content = effect_regex.sub(new_effect, content)

# Replace the hardcoded Dropdown UI for Desktop
desktop_dropdown = re.compile(
    r'<div className="absolute -top-1 -right-1 w-4 h-4 bg-\[#E81C24\] rounded-full flex items-center justify-center border-2 border-\[#F4F6F8\]">\s*<span className="text-\[9px\] font-bold text-white leading-none">1</span>\s*</div>.*?\{isNotifOpen && \(.*?<div className="p-3 space-y-3">.*?</div>\s*</div>\s*\)', re.DOTALL
)

new_desktop_dropdown = '''{unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-[#F4F6F8]">
                    <span className="text-[9px] font-bold text-white leading-none">{unreadCount}</span>
                  </div>
                )}
              </div>
              {isNotifOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-gray-900">Notifications</span>
                    {unreadCount > 0 && <span onClick={markAllAsRead} className="text-[11px] font-semibold text-[#E81C24] cursor-pointer hover:underline">Mark all as read</span>}
                  </div>
                  <div className="p-3 space-y-3 max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div key={notif.id} className={`flex gap-3 p-2 rounded-xl transition-colors ${notif.read ? 'bg-transparent' : 'bg-red-50/50'}`}>
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className={`text-[12.5px] font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</p>
                          <p className="text-[11.5px] text-gray-500 mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center text-gray-500 text-[12px] py-4">No notifications</div>
                    )}
                  </div>
                </div>
              )}'''

content = desktop_dropdown.sub(new_desktop_dropdown, content)

# Replace the hardcoded Dropdown UI for Mobile
mobile_dropdown = re.compile(
    r'<div className="absolute -top-1 -right-1 w-3\.5 h-3\.5 bg-\[#E81C24\] rounded-full flex items-center justify-center border-\[1\.5px\] border-white">\s*<span className="text-\[8px\] font-bold text-white leading-none">1</span>\s*</div>.*?\{isNotifOpen && \(.*?<div className="p-3 space-y-3">.*?</div>\s*</div>\s*\)', re.DOTALL
)

new_mobile_dropdown = '''{unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">
                  <span className="text-[8px] font-bold text-white leading-none">{unreadCount}</span>
                </div>
              )}
              {isNotifOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50 fixed md:absolute">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-gray-900">Notifications</span>
                    {unreadCount > 0 && <span onClick={markAllAsRead} className="text-[11px] font-semibold text-[#E81C24] cursor-pointer hover:underline">Mark all as read</span>}
                  </div>
                  <div className="p-3 space-y-3 max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div key={notif.id} className={`flex gap-3 p-2 rounded-xl transition-colors ${notif.read ? 'bg-transparent' : 'bg-red-50/50'}`}>
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className={`text-[12.5px] font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</p>
                          <p className="text-[11.5px] text-gray-500 mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center text-gray-500 text-[12px] py-4">No notifications</div>
                    )}
                  </div>
                </div>
              )}'''

content = mobile_dropdown.sub(new_mobile_dropdown, content)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated layout.tsx with real notifications")
