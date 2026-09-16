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
effect_regex = re.compile(r'(const fetchUser = async \(\) => \{.*?\};\s*fetchUser\(\);\s*\}, \[.*?\]\);)', re.DOTALL)

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

# Replace the hardcoded Desktop bell dot
content = content.replace(
    '<span className="text-[9px] font-bold text-white leading-none">1</span>',
    '{unreadCount > 0 && <span className="text-[9px] font-bold text-white leading-none">{unreadCount}</span>}'
)
content = content.replace(
    '<div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-[#F4F6F8]">',
    '{unreadCount > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-[#F4F6F8]">'
)
content = content.replace(
    '</span>\n                </div>',
    '</span>\n                </div>}'
)

# Mobile bell dot
content = content.replace(
    '<div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">',
    '{unreadCount > 0 && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">'
)
# We might have replaced this incorrectly if it matched both desktop and mobile above. We will just use regex for the whole bell icon.
