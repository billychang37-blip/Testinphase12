import sys

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = 'import Script from "next/script";\n'

if 'import Script' not in content:
    content = import_statement + content

script_tag = '''
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">
        <Script id="smartsupp" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: 
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '6f996554f2b901c2cc0dca358ba3602086bbaad0';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          
        }} />
        <noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>
        {children}
      </body>
'''

content = content.replace('      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">{children}</body>', script_tag.strip())

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Smartsupp added')
