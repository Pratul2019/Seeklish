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

  const getIcon = (button: string) => {
    switch (button) {
      case "discover":
        return (
          <SiWpexplorer
            size={32}
            className={`${
              activeButton === "discover" ? "text-teal-600" : ""
            } hover:text-teal-500`}
          />
        );
      case "rental":
        return (
          <HiHomeModern
            size={30}
            className={`${
              activeButton === "rental" ? "text-teal-600" : ""
            } hover:text-teal-500`}
          />
        );
      case "application":
        return (
          <MdAppShortcut
            size={30}
            className={`${
              activeButton === "application" ? "text-teal-600" : ""
            } hover:text-teal-500`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex p-5 backdrop-filter backdrop-blur-lg border-b-2 border-gray-700 gap-6 md:gap-12 md:justify-center justify-between z-50">
      
      <div
        className="flex items-center cursor-pointer justify-center relative hover:text-teal-500"
        onMouseEnter={() => handleMouseEnter("search")}
        onMouseLeave={() => handleMouseLeave("search")}
      >
        <Link href={"/Search"} className="flex items-center ">
          <FaMagnifyingGlassLocation size={30} aria-label="Search" />
          <span className="hidden md:inline ml-2">Search</span>
        </Link>
        {hoverStates.search && (
          <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
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
          <div className="flex items-center hover:text-teal-500">
            {getIcon(button) && (
              <React.Fragment>
                {getIcon(button)}
                <span
                  className={`hidden md:inline ml-2 ${
                    activeButton === button ? "text-teal-600" : ""
                  }`}
                >
                  {button.charAt(0).toUpperCase() + button.slice(1)}
                </span>
              </React.Fragment>
            )}
          </div>
          {hoverStates[button as keyof HoverStates] && (
            <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
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
            <Link
              href={`/${session.user.username}`}
              className="flex items-center"
            >
              <Image
                className="rounded-xl w-9 h-9"
                src={session.user.image || ""}
                alt={session.user.name || "User avatar"}
                width={1000}
                height={1000}
              />
              <span className="hidden md:inline ml-2 hover:text-teal-500">
                {session.user.name}
              </span>
            </Link>
            {hoverStates.avatar && (
              <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
                {session.user.name}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer justify-center hover:text-teal-500"
            onMouseEnter={() => handleMouseEnter("avatar")}
            onMouseLeave={() => handleMouseLeave("avatar")}
          >
            <Link href="/signin" className="flex items-center">
              <RxAvatar size={32} />
              <span className="hidden md:inline ml-2">Sign In</span>
            </Link>
            {hoverStates.avatar && (
              <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
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
