import { Button } from "@/components/Button";
import Image from "next/image";

interface Props {
  location: string;
  locationDescription: string;
}

export function TripLocation({ location, locationDescription }: Props) {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>

      <div className="relative h-[280px] w-full">
        <Image
          src="/map-mobile.png"
          fill
          alt={location}
          style={{ objectFit: "cover" }}
          className="shadow-md rounded-lg"
        />
      </div>

      <h3 className="text-primaryDarker text-sm font-semibold mt-3">
        {location}
      </h3>

      <p className="text-xs leading-5 text-primaryDarker mt-3">
        {locationDescription}
      </p>

      <Button variant="outlined" className="mt-5 w-full">
        Ver no Google Maps
      </Button>
    </div>
  );
}
