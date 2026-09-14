import sys
import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we import ArrowLeft, Sun, Check from lucide-react
if 'ArrowLeft' not in content:
    content = content.replace('from "lucide-react";', 'ArrowLeft, Sun, Check,\n} from "lucide-react";')
else:
    # Just ensure Sun and Check are imported
    if 'Sun' not in content:
        content = content.replace('Moon,', 'Moon, Sun, Check,')

# Add dark mode and notification state
if 'isDarkMode' not in content:
    content = content.replace('const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);', 
    'const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);\n  const [isDarkMode, setIsDarkMode] = useState(false);\n  const [isNotifOpen, setIsNotifOpen] = useState(false);')

# Add dark mode effect
if 'toggleDarkMode' not in content:
    content = content.replace('const handleLogout = async () => {', 
    '''const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleLogout = async () => {''')

# Update Desktop Header (around line 242)
desktop_header_regex = re.compile(r'\{\s*isDashboardHome \? \(.*?\)\s*:\s*\(\s*<div className="flex items-center gap-2 text-gray-500 font-semibold text-\[13px\] tracking-wide cursor-pointer hover:text-gray-700 transition-colors">\s*DASHBOARD OVERVIEW <ChevronDown className="w-4 h-4" />\s*</div>\s*\)', re.DOTALL)

new_desktop_header = '''{isDashboardHome ? (
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
                Hello, {profile?.first_name || 'Amanda'}
              </h1>
              <p className="text-gray-500 text-sm font-medium mt-0.5">Good morning!</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-gray-500 font-semibold text-[13px] tracking-wide">
              <div onClick={() => router.back()} className="flex items-center gap-1.5 cursor-pointer hover:text-[#E81C24] transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                 <ArrowLeft className="w-4 h-4" /> Back
              </div>
              <span className="cursor-pointer hover:text-gray-700 transition-colors flex items-center gap-1.5 hidden md:flex">
                DASHBOARD OVERVIEW <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          )}'''

content = desktop_header_regex.sub(new_desktop_header, content)

# Desktop Dark Mode & Notifications
desktop_actions_regex = re.compile(r'<div className="relative cursor-pointer hover:opacity-80 transition-opacity">.*?<span className="text-\[9px\] font-bold text-white leading-none">1</span>\s*</div>\s*</div>', re.DOTALL)
new_desktop_actions = '''<div className="relative flex items-center gap-4">
              <div onClick={toggleDarkMode} className="cursor-pointer hover:text-[#E81C24] transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-[#F4F6F8]">
                  <span className="text-[9px] font-bold text-white leading-none">1</span>
                </div>
              </div>
              {isNotifOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-gray-900">Notifications</span>
                    <span className="text-[11px] font-semibold text-[#E81C24] cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[12.5px] font-semibold text-gray-900">Login Successful</p>
                        <p className="text-[11.5px] text-gray-500 mt-0.5">You just logged into your account from a new device.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>'''
content = desktop_actions_regex.sub(new_desktop_actions, content)

# Mobile Header Back Button & Dark mode
mobile_header_regex = re.compile(r'<div className="flex items-center gap-3">\s*<Menu.*?/>\s*<img.*?/>\s*</div>\s*<div className="flex items-center space-x-3.5">\s*<Moon.*?/>', re.DOTALL)
new_mobile_header = '''<div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-700 cursor-pointer" onClick={() => setIsMobileSidebarOpen(true)} />
            {!isDashboardHome && (
              <ArrowLeft className="w-5 h-5 text-gray-500 cursor-pointer hover:text-[#E81C24]" onClick={() => router.back()} />
            )}
            <img src="/logo_main.png" alt="OCBC" className="w-[100px] h-auto object-contain cursor-pointer" onClick={() => router.push('/dashboard')} />
          </div>
          <div className="flex items-center space-x-3.5">
            <div onClick={toggleDarkMode} className="cursor-pointer">
              {isDarkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </div>'''
content = mobile_header_regex.sub(new_mobile_header, content)

# Mobile Notification click
content = content.replace(
    '<div className="relative">\n              <Bell',
    '<div className="relative cursor-pointer" onClick={() => setIsNotifOpen(!isNotifOpen)}>\n              <Bell'
)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated layout.tsx for back buttons, dark mode, and notifications")
