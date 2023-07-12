"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import { TripItem } from "@/components/TripItem";

interface GetTripsParams {
  text: string;
  startDate: Date | null;
  budget?: string;
}

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function getTrips() {
      const response = await fetch(
        `/api/trips/search?text=${
          searchParams.get("text") ?? ""
        }&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
          "budget"
        )}`
      );

      const data = await response.json();

      // console.log({ data });
      setTrips(data);
    }

    getTrips();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center lg:items-start p-5">
      <h1 className="text-primaryDarker font-semibold text-xl lg:w-full lg:text-left lg:text-[2.5rem] ">
        Viagens Encontradas
      </h1>

      <h2 className="text-grayPrimary font-medium mb-5 lg:mt-5 lg:w-full lg:text-left ">
        {trips.length > 0
          ? "Listamos as melhores viagens para você!"
          : "Não encontramos nada nos seus parâmetros! =("}
      </h2>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
        {trips.map((trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}
