import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add mobile notification dropdown
content = content.replace(
    '<div className="relative cursor-pointer" onClick={() => setIsNotifOpen(!isNotifOpen)}>\n              <Bell className="w-5 h-5 text-gray-700" />\n              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">\n                <span className="text-[8px] font-bold text-white leading-none">1</span>\n              </div>\n            </div>',
    '''<div className="relative cursor-pointer" onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <Bell className="w-5 h-5 text-gray-700" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">
                <span className="text-[8px] font-bold text-white leading-none">1</span>
              </div>
              {isNotifOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50 fixed md:absolute">
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
)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated mobile notifications")
