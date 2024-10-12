"use client";

import React, { useState, useMemo, useCallback } from "react";
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

type HoverStates = Record<string, boolean>;

const buttonConfig = {
  discover: { icon: SiWpexplorer, size: 32 },
  rental: { icon: HiHomeModern, size: 30 },
  application: { icon: MdAppShortcut, size: 30 },
};

const Header: React.FC = () => {
  const [hoverStates, setHoverStates] = useState<HoverStates>({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const activeButton = useMemo(() => {
    return Object.keys(buttonConfig).find(button => pathname.includes(`/${button}`)) || null;
  }, [pathname]);

  const handleButtonClick = useCallback((buttonName: string) => {
    router.push(`/${buttonName}`);
  }, [router]);

  const handleMouseEnter = useCallback((button: string) => {
    setHoverStates(prev => ({ ...prev, [button]: true }));
  }, []);

  const handleMouseLeave = useCallback((button: string) => {
    setHoverStates(prev => ({ ...prev, [button]: false }));
  }, []);

  const renderIcon = useCallback((button: string) => {
    const { icon: Icon, size } = buttonConfig[button as keyof typeof buttonConfig];
    return (
      <Icon
        size={size}
        className={`${activeButton === button ? "text-teal-600" : ""} hover:text-teal-500`}
      />
    );
  }, [activeButton]);

  const renderButton = useCallback((button: string) => (
    <div
      key={button}
      className="flex items-center cursor-pointer justify-center relative"
      onMouseEnter={() => handleMouseEnter(button)}
      onMouseLeave={() => handleMouseLeave(button)}
      onClick={() => handleButtonClick(button)}
    >
      <div className="flex items-center hover:text-teal-500">
        {renderIcon(button)}
        <span className={`hidden md:inline ml-2 ${activeButton === button ? "text-teal-600" : ""}`}>
          {button.charAt(0).toUpperCase() + button.slice(1)}
        </span>
      </div>
      {hoverStates[button] && (
        <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
          {button.charAt(0).toUpperCase() + button.slice(1)}
        </div>
      )}
    </div>
  ), [activeButton, handleButtonClick, handleMouseEnter, handleMouseLeave, hoverStates, renderIcon]);

  const renderUserSection = useMemo(() => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (session?.user?.username) {
      return (
        <div
          className="flex items-center cursor-pointer justify-center"
          onMouseEnter={() => handleMouseEnter("avatar")}
          onMouseLeave={() => handleMouseLeave("avatar")}
        >
          <Link href={`/${session.user.username}`} className="flex items-center">
            <Image
              className="rounded-xl w-9 h-9"
              src={session.user.image || ""}
              alt=""
              width={36}
              height={36}
              priority
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
      );
    }

    return (
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
    );
  }, [session, status, handleMouseEnter, handleMouseLeave, hoverStates.avatar]);

  return (
    <div className="flex p-5 backdrop-filter backdrop-blur-lg border-b-2 border-gray-700 gap-6 md:gap-12 md:justify-center justify-between z-50">
      <div
        className="flex items-center cursor-pointer justify-center relative hover:text-teal-500"
        onMouseEnter={() => handleMouseEnter("search")}
        onMouseLeave={() => handleMouseLeave("search")}
      >
        <Link href="/Search" className="flex items-center">
          <FaMagnifyingGlassLocation size={30} aria-label="Search" />
          <span className="hidden md:inline ml-2">Search</span>
        </Link>
        {hoverStates.search && (
          <div className="absolute -bottom-8 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
            Search Page
          </div>
        )}
      </div>

      {Object.keys(buttonConfig).map(renderButton)}

      <div className="flex items-center gap-1 relative">
        {renderUserSection}
        <div className="mt-2">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);