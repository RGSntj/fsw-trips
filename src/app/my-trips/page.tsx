"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyTrips() {
  const [reservation, setReservation] = useState<TripReservation[]>([]);
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    async function fetchReservations() {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      );

      const res = await response.json();
      setReservation(res);
      // console.log({ res });
    }

    fetchReservations();
  }, [status]);

  console.log({ reservation });

  return <div className="container mx-auto"></div>;
}
