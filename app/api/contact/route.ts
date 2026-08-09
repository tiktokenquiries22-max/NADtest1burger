import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, vehicleModel, serviceRequested, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, Email and Message are required.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpUser || 'no-reply@bellautomotive.co.uk',
      to: 'igmfx@outlook.com',
      replyTo: email,
      subject: `[Bell Automotive Web Enquiry] ${serviceRequested || 'General Enquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0d0f; color: #ffffff; padding: 30px; border-radius: 8px;">
          <h2 style="color: #22d3ee; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">
            NEW BELL AUTOMOTIVE GARAGE ENQUIRY
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; color: #e2e8f0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px;">Customer Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px 0;"><a style="color: #22d3ee;" href="tel:${phone}">${phone || 'Not provided'}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0;"><a style="color: #22d3ee;" href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Vehicle Model:</td>
              <td style="padding: 8px 0;">${vehicleModel || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service Needed:</td>
              <td style="padding: 8px 0;">${serviceRequested || 'General Service'}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 15px; background: #121518; border-left: 4px solid #22d3ee; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #ffffff;">Customer Message:</h4>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #cbd5e1;">${message}</p>
          </div>

          <p style="margin-top: 30px; font-size: 11px; color: #64748b;">
            Sent automatically from Bell Automotive Range Rover Dissection Showroom.
          </p>
        </div>
      `,
    };

    if (smtpUser && smtpPass) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('[DEV ENQUIRY RECEIVED]:', mailOptions);
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully to Bell Automotive.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please call 01244 813 321.' },
      { status: 500 }
    );
  }
}
