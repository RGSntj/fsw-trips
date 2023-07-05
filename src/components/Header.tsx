"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { status, data } = useSession();
  const handleLogin = () => signIn();

  const handleLogout = () => signOut();

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <div className="relative h-[32px] w-[183px]">
        <Image
          width={183}
          height={32}
          src="/logo.png"
          alt="Logo FullstackWeek"
        />
      </div>
      {status === "unauthenticated" && (
        <button
          className="text-purple-700 text-sm font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border-gray-500 border border-solid rounded-full p-2 px-3 relative">
          <AiOutlineMenu
            size={16}
            className="cursor-pointer"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
          <Image
            src={data.user.image!}
            alt={data.user.name!}
            height={35}
            width={35}
            className="rounded-full"
          />
          {isOpenMenu && (
            <div className="absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <button
                className="text-purple-500 text-sm font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
