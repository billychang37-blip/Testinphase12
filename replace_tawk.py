import sys

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

smartsupp_code = '''<script type="text/javascript" dangerouslySetInnerHTML={{
          __html: 
var _smartsupp = _smartsupp || {};
_smartsupp.key = '6f996554f2b901c2cc0dca358ba3602086bbaad0';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
          
        }} />'''

tawkto_code = '''<script type="text/javascript" dangerouslySetInnerHTML={{
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

content = content.replace(smartsupp_code, tawkto_code)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
