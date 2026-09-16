import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_avatar_ui = """                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-[32px] break-all sm:break-normal font-bold text-gray-400 overflow-hidden relative">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{initial}</span>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Upload new picture"
                    />
                  </div>"""

new_avatar_ui = """                <div className="flex items-center gap-6 mb-8">
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
                  </div>"""

content = content.replace(old_avatar_ui, new_avatar_ui)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated settings page avatar UI")
