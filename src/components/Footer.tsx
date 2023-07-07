import Image from "next/image";

export function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-walterWhite p-5">
      <Image src="/logo.png" width={133} height={23} alt="fullstackweek logo" />
      <p className="text-sm font-medium mt-1 text-primaryDarker">
        Todos os direitos reservados.
      </p>
    </div>
  );
}
