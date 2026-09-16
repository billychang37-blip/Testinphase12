import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_use_effect = """  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (profileData) {
        setProfile(profileData);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [router]);"""

new_use_effect = """  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (profileData) {
        setProfile({ ...profileData, ...session.user.user_metadata });
      }
      setIsLoading(false);
    };
    
    fetchUser();
    
    window.addEventListener('profileUpdated', fetchUser);
    return () => window.removeEventListener('profileUpdated', fetchUser);
  }, [router]);"""

content = content.replace(old_use_effect, new_use_effect)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated layout.tsx for real-time avatar updates")
