import { NextResponse } from "next/server";
import events from "@/data/events.json";

// GET /api/events
export async function GET() {
  try {
    // Return data
    return NextResponse.json({
      success: true,
      data: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events'
      },
      { status: 500 }
    );
  }
}