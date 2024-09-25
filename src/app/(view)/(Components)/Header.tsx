"use client";

import React, { useState, useMemo } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { MdAppShortcut } from "react-icons/md";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { SiWpexplorer } from "react-icons/si";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";


import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import Menu from "./Menu";

type HoverStates = {
  discover: boolean;
  rental: boolean;
  application: boolean;
  upload: boolean;
  avatar: boolean;
  search: boolean;
};

const Header: React.FC = () => {
  const [hoverStates, setHoverStates] = useState<HoverStates>({
    discover: false,
    rental: false,
    application: false,
    upload: false,
    avatar: false,
    search: false,
  });
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const activeButton = useMemo(() => {
    if (pathname.includes("/discover")) return "discover";
    if (pathname.includes("/rental")) return "rental";
    if (pathname.includes("/application")) return "application";
    return null;
  }, [pathname]);

  const handleButtonClick = (buttonName: string) => {
    router.push(`/${buttonName}`);
  };

  const handleMouseEnter = (button: keyof HoverStates) => {
    setHoverStates((prev) => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button: keyof HoverStates) => {
    setHoverStates((prev) => ({ ...prev, [button]: false }));
  };

  return (
    <div className="flex py-4 px-2 backdrop-filter backdrop-blur-lg gap-6 md:gap-20 md:justify-center justify-between z-50">
      <div
        className="flex items-center cursor-pointer justify-center relative"
        onMouseEnter={() => handleMouseEnter("search")}
        onMouseLeave={() => handleMouseLeave("search")}
      >
        <Link href={"/Search"}>
          <FaMagnifyingGlassLocation size={30} aria-label="Search" className="hover:text-cyan-500" />
        </Link>
        {hoverStates.search && (
          <div className="absolute -bottom-8 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
            Search Page
          </div>
        )}
      </div>

      {["discover", "rental", "application"].map((button) => (
        <div
          key={button}
          className="flex items-center cursor-pointer justify-center relative"
          onMouseEnter={() => handleMouseEnter(button as keyof HoverStates)}
          onMouseLeave={() => handleMouseLeave(button as keyof HoverStates)}
          onClick={() => handleButtonClick(button)}
        >
          {button === "discover" && <SiWpexplorer size={32} className={`hover:text-cyan-500 ${activeButton === "discover" ? "text-cyan-600" : ""}`} />}
          {button === "rental" && <HiHomeModern size={30} className={`hover:text-cyan-500 ${activeButton === "rental" ? "text-cyan-600" : ""}`} />}
          {button === "application" && <MdAppShortcut size={30} className={`hover:text-cyan-500 ${activeButton === "application" ? "text-cyan-600" : ""}`} />}
          {hoverStates[button as keyof HoverStates] && (
            <div className="absolute -bottom-8 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
              {button.charAt(0).toUpperCase() + button.slice(1)}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-1 relative">
        {session?.user ? (
          <div
            className="flex items-center cursor-pointer justify-center"
            onMouseEnter={() => handleMouseEnter("avatar")}
            onMouseLeave={() => handleMouseLeave("avatar")}
          >
            <Link href={`/${session.user.username}`}>
              <Image
                className="rounded-xl w-9 h-9"
                src={session.user.image || ""}
                alt={session.user.name || "User avatar"}
                width={1000}
                height={1000}
              />
            </Link>
            {hoverStates.avatar && (
              <div className="absolute -bottom-8 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
                {session.user.name}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer justify-center"
            onMouseEnter={() => handleMouseEnter("avatar")}
            onMouseLeave={() => handleMouseLeave("avatar")}
          >
            <Link href="/signin">
              <RxAvatar size={32} />
            </Link>
            {hoverStates.avatar && (
              <div className="absolute -bottom-8 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
                Get Started
              </div>
            )}
          </div>
        )}
        <div className="mt-2">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
