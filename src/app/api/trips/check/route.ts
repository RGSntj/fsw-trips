import { prisma } from "@/lib/prisma";
import { isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(requests: Request) {
  const req = await requests.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  if (isBefore(new Date(req.startDate), new Date(trip?.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
        },
      }),
      { status: 400 }
    );
  }

  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
        },
      }),
      { status: 400 }
    );
  }

  const reservation = await prisma.tripReservation.findMany({
    where: {
      tripsId: req.tripId,
      startDate: {
        lte: new Date(req.startDate),
      },
      endDate: {
        gte: new Date(req.endDate),
      },
    },
  });

  if (reservation.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP ALREADY RESERVED.",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
    })
  );
}
