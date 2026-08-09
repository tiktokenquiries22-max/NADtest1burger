import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      registration,
      model,
      serviceRequired,
      preferredContact,
      message,
    } = body;

    // Server-side validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'igmfx@outlook.com';
    const emailSubject = `New Website Sales Enquiry - ${fullName} (${serviceRequired || 'General'})`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111; line-height: 1.6; border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px;">
        <h2 style="color: #000; border-bottom: 2px solid #22d3ee; padding-bottom: 8px; margin-top: 0;">
          NEW WEBSITE SALES ENQUIRY
        </h2>
        <p style="font-size: 14px; color: #555;">A new enquiry was submitted via the Bell Automotive website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Full Name:</td>
            <td style="padding: 8px 0;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Vehicle Reg:</td>
            <td style="padding: 8px 0;"><strong>${registration || 'Not provided'}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Vehicle Model:</td>
            <td style="padding: 8px 0;">${model || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Service Required:</td>
            <td style="padding: 8px 0;">${serviceRequired}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Preferred Contact:</td>
            <td style="padding: 8px 0;">${preferredContact || 'Phone'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; background: #f9f9f9; padding: 16px; border-left: 4px solid #22d3ee; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase;">Visitor Message:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${message}</p>
        </div>

        <p style="font-size: 11px; color: #888; margin-top: 24px; text-align: center; border-t: 1px solid #eee; padding-top: 12px;">
          Sent automatically from Bell Automotive Range Rover Showroom Website
        </p>
      </div>
    `;

    // Retrieve SMTP credentials from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${fullName} (Website Enquiry)" <${smtpUser}>`,
        replyTo: email,
        to: recipientEmail,
        subject: emailSubject,
        html: htmlContent,
      });

      console.log(`[Email Sent] Successfully delivered sales enquiry from ${email} to ${recipientEmail}`);
    } else {
      // Graceful server logging if environment variables are awaiting setup
      console.warn(
        `[Email Notification Warning] SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment variables. Form data received cleanly:`,
        { fullName, email, phone, registration, model, serviceRequired, message }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully.',
    });
  } catch (error: any) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}
