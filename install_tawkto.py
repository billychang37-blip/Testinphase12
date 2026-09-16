import sys
import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace head script
smartsupp_script_regex = re.compile(r'<script type="text/javascript" dangerouslySetInnerHTML=\{\{\s*__html: \s*var _smartsupp =.*?\s*\}\} />', re.DOTALL)
tawkto_script = '''<script type="text/javascript" dangerouslySetInnerHTML={{
          __html: 
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a9b47e7d862ed3449e55818/1k1n91ojf';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
          
        }} />'''

content = smartsupp_script_regex.sub(tawkto_script, content)

# Remove noscript
noscript_regex = re.compile(r'<noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>\n\s*')
content = noscript_regex.sub('', content)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Tawk.to installed')
