import Image from "next/image";
import { Trip } from "@prisma/client";

import ReactCountryFlag from "react-country-flag";
import Link from "next/link";

interface Props {
  trip: Trip;
}

export function TripItem({ trip }: Props) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col">
        <div className="relative h-[280px] w-[280px]">
          <Image
            fill
            src={trip.coverImage}
            alt={trip.name}
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-md"
          />
        </div>
        <h3 className="text-primaryDarker font-medium text-sm mt-2">
          {trip.name}
        </h3>
        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary">{trip.location}</p>
        </div>
        <p className="text-xs text-grayPrimary">
          <span className="text-primary font-medium">
            R$ {trip.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>
      </div>
    </Link>
  );
}
