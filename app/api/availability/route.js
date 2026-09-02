import { NextResponse } from 'next/server';
import { getCalendar } from '@/lib/googleCalendar';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date'); // format: YYYY-MM-DD

    if (!dateStr) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const requestedDate = new Date(dateStr);
    // Friday is day 5 in getDay() (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
    if (requestedDate.getDay() === 5) {
      return NextResponse.json({ slots: [] }); // No slots on Friday
    }

    // BD Time is GMT+6
    // We want 10:00 AM BD time today to 3:00 AM BD time tomorrow
    const timeZone = '+06:00';
    const startStr = `${dateStr}T10:00:00${timeZone}`;
    
    // Next day string for 3:00 AM
    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    const endStr = `${nextDayStr}T03:00:00${timeZone}`;

    const startTime = new Date(startStr);
    const endTime = new Date(endStr);

    const calendar = getCalendar();
    
    let busyTimes = [];
    try {
      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: startTime.toISOString(),
          timeMax: endTime.toISOString(),
          timeZone: 'Asia/Dhaka',
          items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
        },
      });
      const calendars = response.data.calendars;
      if (calendars && calendars[process.env.GOOGLE_CALENDAR_ID]) {
        busyTimes = calendars[process.env.GOOGLE_CALENDAR_ID].busy;
      }
    } catch (err) {
      console.error('Error fetching calendar freebusy', err);
      // Fallback: assume no busy times if calendar fetch fails (e.g., config not set yet)
    }

    // Generate 1-hour slots
    const slots = [];
    let currentSlot = startTime;

    const now = new Date(); // To filter out past slots

    while (currentSlot < endTime) {
      const slotEnd = new Date(currentSlot.getTime() + 60 * 60 * 1000); // 1 hour later

      // Check if this slot is in the past
      if (currentSlot > now) {
        // Check if this slot overlaps with any busy time
        const isBusy = busyTimes.some((busy) => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return (
            (currentSlot >= busyStart && currentSlot < busyEnd) ||
            (slotEnd > busyStart && slotEnd <= busyEnd) ||
            (currentSlot <= busyStart && slotEnd >= busyEnd)
          );
        });

        if (!isBusy) {
          slots.push(currentSlot.toISOString());
        }
      }
      
      currentSlot = slotEnd;
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Availability API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
