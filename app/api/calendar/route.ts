// app/api/calendar/route.ts
import { NextResponse } from 'next/server';
import type { CalendarApiResponse } from '@/lib/calendar-types';
import { mockCalendarDays } from '../../../lib/mockData';

export async function GET() {
  const body: CalendarApiResponse = {
    days: mockCalendarDays,
  };

  return NextResponse.json(body, {
    status: 200,
  });
}
