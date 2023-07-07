import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(requests: Request) {
  const req = await requests.json();

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
