# -*- coding: utf-8 -*-
import re

with open('src/app/api/auth/welcome/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

resend_send = re.compile(r'await resend\.emails\.send\(\{\s*from: \'OCBC Digital <no-reply@bukubinz.org>\',\s*to: formData\.email,\s*subject: \'OCBC Digital - Your Secure Access Credentials\',\s*html: `(.*?)`,\s*\}\);', re.DOTALL)

new_resend_send = '''await resend.emails.send({
          from: 'OCBC Digital <no-reply@bukubinz.org>',
          to: formData.email,
          subject: 'Welcome to OCBC Digital Banking',
          text: `Dear ${fullName},

Welcome to OCBC Digital Banking. Your application has been successfully processed and your digital profile is now active.

Your Access Details:
User ID (Access Code): ${userId}
Secure 8-Digit PIN: ${pin}

Security Notice: Please memorize your PIN. OCBC staff will never ask you for your PIN.

Please visit our website to proceed to secure login.

Important: This is an automated message. Please do not reply.
(C) ${new Date().getFullYear()} Oversea-Chinese Banking Corporation Limited. Co. Reg. No.: 193200032W.`,
          html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to OCBC Digital Banking</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc;">
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; background-color: #ffffff;">
    <div style="background-color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #E81C24;">
      <img src="https://fvtvkpgyqpqyqaoabfna.supabase.co/storage/v1/object/public/assets/logo_main.png" alt="OCBC Bank" style="height: 50px; object-fit: contain;" />
    </div>
    
    <div style="padding: 24px; color: #333333;">
      <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">Welcome to OCBC Digital Banking</h1>
      
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">Dear <strong>${fullName}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 20px 0; color: #4b5563;">
        Your application for OCBC Online Banking has been successfully processed and your digital profile is now active.
      </p>
      
      <div style="background-color: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 4px; padding: 20px; margin: 20px 0;">
        <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px;">Your Access Details</h3>
        
        <div style="margin-bottom: 12px;">
          <p style="margin: 0 0 2px 0; font-size: 12px; color: #6b7280;">User ID (Access Code)</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace; color: #1a1a1a; letter-spacing: 1px;">${userId}</p>
        </div>
        
        <div>
          <p style="margin: 0 0 2px 0; font-size: 12px; color: #6b7280;">Secure 8-Digit PIN</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace; color: #E81C24; letter-spacing: 2px;">${pin}</p>
        </div>
      </div>

      <p style="font-size: 13px; line-height: 1.5; margin: 0 0 24px 0; color: #4b5563; background-color: #f0fdf4; border-left: 3px solid #22c55e; padding: 10px 12px;">
        <strong>Security Notice:</strong> Please memorize your PIN. OCBC staff will never ask you for your PIN.
      </p>
      
      <div style="text-align: left; margin-bottom: 8px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://bukubinz.org'}/login" style="background-color: #E81C24; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 4px; display: inline-block;">Login to your account</a>
      </div>
    </div>
    
    <div style="background-color: #F9FAFB; border-top: 1px solid #E5E7EB; padding: 16px 24px; font-size: 11px; color: #6b7280; line-height: 1.4;">
      <p style="margin: 0 0 4px 0;"><strong>Important:</strong> This is an automated message. Please do not reply.</p>
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Oversea-Chinese Banking Corporation Limited. Co. Reg. No.: 193200032W.</p>
    </div>
  </div>
</body>
</html>`
        });'''

content = resend_send.sub(new_resend_send, content)

with open('src/app/api/auth/welcome/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated welcome email to avoid spam")
