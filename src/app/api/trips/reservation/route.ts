import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(requests: Request) {
  const req = await requests.json();

  const { startDate, endDate, userId, tripId, totalPaid, guests } = req;

  const trip = await prisma.trip.findMany({
    where: {
      id: tripId,
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

  await prisma.tripReservation.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      tripId,
      totalPaid,
      guests,
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
    { status: 201 }
  );
}
