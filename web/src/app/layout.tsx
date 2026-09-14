import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OCBC Digital Banking',
  description: 'Modern Banking Designed for the Digital You.',
  icons: {
    icon: '/meta-img.png',
    apple: '/meta-img.png',
  },
  openGraph: {
    title: 'OCBC Digital Banking',
    description: 'Modern Banking Designed for the Digital You.',
    images: ['/meta-img.png'],
  },
};

export const viewport: import('next').Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
var _smartsupp = _smartsupp || {};
_smartsupp.key = '6f996554f2b901c2cc0dca358ba3602086bbaad0';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
          `
        }} />
        <noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
