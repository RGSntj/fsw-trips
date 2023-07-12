import Image from "next/image";

interface Props {
  highlights: string[];
}

export function TripHighlights({ highlights }: Props) {
  return (
    <div className="flex flex-col p-5 lg:p-0">
      <h2 className="font-semibold text-primaryDarker mb-2 lg:text-xl lg:mt-12">
        Destaques
      </h2>

      <div className="flex flex-wrap gap-y-2 lg:mt-5">
        {highlights.map((highlight, index) => {
          return (
            <div key={highlight} className="flex items-center gap-3 w-1/2">
              <Image
                src="/check-icon.png"
                width={15}
                height={15}
                alt={highlight}
              />

              <p className="text-grayPrimary text-xs lg:text-base">
                {highlight}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
