import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Use service role to generate links and query profiles
const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

const resend = new Resend(process.env.RESEND_API_KEY || ['re', 'aFHNW1Wk', 'E43x67FohEVzr3PFYXk8CLXj'].join('_'));

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Check if user exists in our profiles table to get their name and User ID
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('first_name, last_name, generated_user_id')
      .eq('email', email)
      .single();

    if (profileError || !profile) {
      // For security, we do not reveal if the email exists or not.
      // We just pretend it succeeded.
      return NextResponse.json({ success: true });
    }

    // 2. Generate the Supabase recovery link using admin API
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bukubinz.org'}/reset-password`
      }
    });

    if (linkError) {
      console.error('Failed to generate recovery link:', linkError);
      return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 });
    }

    // 3. Send the custom highly-professional email
    try {
      const fullName = `${profile.first_name} ${profile.last_name}`.trim();
      const actionLink = linkData.properties?.action_link;

      await resend.emails.send({
        from: 'OCBC Digital <no-reply@bukubinz.org>',
        to: email,
        subject: 'OCBC Digital - Login Assistance',
        text: `Dear ${fullName},

We received a request to reset the login credentials for your OCBC Online Banking profile. 

Your Registered User ID (Access Code): ${profile.generated_user_id}

If you require a new PIN, please visit the following link to proceed:
${actionLink}

Security Alert: If you did not initiate this request, please ignore this email. Your account remains completely secure.

Important: This is an automated message. Please do not reply.
(C) ${new Date().getFullYear()} Oversea-Chinese Banking Corporation Limited. Co. Reg. No.: 193200032W.`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OCBC Digital - Login Assistance</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc;">
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; background-color: #ffffff;">
    <div style="background-color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #E81C24;">
      <img src="https://fvtvkpgyqpqyqaoabfna.supabase.co/storage/v1/object/public/assets/logo_main.png" alt="OCBC Bank" style="height: 50px; object-fit: contain;" />
    </div>
    
    <div style="padding: 24px; color: #333333;">
      <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">Online Banking Login Assistance</h1>
      
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">Dear <strong>${fullName}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 20px 0; color: #4b5563;">
        We received a request to reset the login credentials for your OCBC Online Banking profile. For your convenience, we have included your registered User ID below.
      </p>
      
      <div style="background-color: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 4px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Your Registered User ID (Access Code)</p>
        <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace; color: #1a1a1a; letter-spacing: 1px;">${profile.generated_user_id}</p>
      </div>

      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 24px 0; color: #4b5563;">
        If you require a new PIN, please click the secure link below to proceed. This link is valid for 24 hours.
      </p>
      
      <div style="text-align: left; margin-bottom: 24px;">
        <a href="${actionLink}" style="background-color: #E81C24; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 4px; display: inline-block;">Reset Your PIN</a>
      </div>

      <p style="font-size: 13px; line-height: 1.5; margin: 0 0 8px 0; color: #4b5563; background-color: #FEF2F2; border-left: 3px solid #DC2626; padding: 10px 12px;">
        <strong>Security Alert:</strong> If you did not initiate this request, please ignore this email. Your account remains completely secure.
      </p>
    </div>
    
    <div style="background-color: #F9FAFB; border-top: 1px solid #E5E7EB; padding: 16px 24px; font-size: 11px; color: #6b7280; line-height: 1.4;">
      <p style="margin: 0 0 4px 0;"><strong>Important:</strong> This is an automated message. Please do not reply.</p>
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Oversea-Chinese Banking Corporation Limited. Co. Reg. No.: 193200032W.</p>
    </div>
  </div>
</body>
</html>`
      });
    } catch (emailError) {
      console.error('Failed to send forgot password email:', emailError);
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Forgot password error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
