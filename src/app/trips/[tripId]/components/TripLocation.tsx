import { Button } from "@/components/Button";
import Image from "next/image";

interface Props {
  location: string;
  locationDescription: string;
}

export function TripLocation({ location, locationDescription }: Props) {
  return (
    <div className="p-5 lg:p-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">
        Localização
      </h2>

      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src="/map-mobile.png"
          fill
          alt={location}
          style={{ objectFit: "cover" }}
          className="shadow-md rounded-lg"
        />
      </div>

      <div className="relative h-[480px] hidden w-full lg:block">
        <Image
          src="/map-desktop.png"
          fill
          alt={location}
          style={{ objectFit: "cover" }}
          className="shadow-md rounded-lg"
        />
      </div>

      <h3 className="text-primaryDarker text-sm font-semibold mt-3 lg:text-base lg:mt-5">
        {location}
      </h3>

      <p className="text-xs leading-5 text-primaryDarker mt-3 lg:text-sm lg:mt-4">
        {locationDescription}
      </p>

      <Button variant="outlined" className="mt-5 w-full">
        Ver no Google Maps
      </Button>
    </div>
  );
}
