import { NextResponse } from 'next/server';
import { getCalendar } from '@/lib/googleCalendar';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, timeSlot } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (timeSlot) {
      // 1. Add to Google Calendar
      try {
        const calendar = getCalendar();
        const startTime = new Date(timeSlot);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

        await calendar.events.insert({
          calendarId: process.env.GOOGLE_CALENDAR_ID,
          requestBody: {
            summary: `Meeting with ${name}`,
            description: `Subject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}`,
            start: {
              dateTime: startTime.toISOString(),
              timeZone: 'Asia/Dhaka',
            },
            end: {
              dateTime: endTime.toISOString(),
              timeZone: 'Asia/Dhaka',
            },
          },
        });
      } catch (calError) {
        console.error('Google Calendar Error:', calError);
        // We log the error but still send the email below
      }
    }

    // 2. Send Email via NodeMailer
    try {
      const emailHtml = `
        <h3>New Contact / Booking Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${
          timeSlot
            ? `<p><strong>Requested Slot:</strong> ${new Date(timeSlot).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BD Time)</p>`
            : '<p><strong>Type:</strong> General Message</p>'
        }
      `;

      await sendMail({
        to: process.env.SMTP_USER, // Send to the site owner
        subject: `New Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: emailHtml,
      });
    } catch (mailError) {
      console.error('NodeMailer Error:', mailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Request sent successfully!' });
  } catch (error) {
    console.error('Book API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
