"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserReserventionItem } from "./components/UserReserventionItem";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  async function fetchReservations() {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`
    );

    const res = await response.json();
    setReservations(res);
    // console.log({ res });
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas Viagens
      </h1>

      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <UserReserventionItem
            key={reservation.id}
            reservation={reservation}
            fetchReservations={fetchReservations}
          />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="mt-2 font-medium text-primaryDarker">
            Você ainda não tem nenhuma reserva !
          </p>
          <Link href="/">
            <Button className="mt-2 w-full">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
