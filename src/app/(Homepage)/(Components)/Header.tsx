"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useState } from "react";
import { IoDocuments } from "react-icons/io5";

const Header = () => {
  const [isHoveringPartTime, setIsHoveringPartTime] = useState(false);
  const [isHoveringTerms, setIsHoveringTerms] = useState(false);
  const [isHomeHover, setHomeHover] = useState(false);

  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-filter backdrop-blur-lg border-b-2 border-gray-700">
        <div className="flex justify-between items-center py-4">
          <div
            className="relative"
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
          >
            <Link href="/" className="flex items-center hover:text-teal-500">
              <FaHome
                size={30}
                className={`${pathname === "/" ? "text-teal-400" : ""}`}
              />
              <span className="hidden md:inline ml-1">Home</span>
            </Link>
            {isHomeHover && (
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
                Back to Home
              </div>
            )}
          </div>
          <div className="flex space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringPartTime(true)}
              onMouseLeave={() => setIsHoveringPartTime(false)}
            >
              <Link
                href="/Oppurtunity"
                className={`flex items-center hover:text-teal-400 ${
                  pathname === "/Oppurtunity" ? "text-teal-800" : ""
                }`}
              >
                <MdWork size={30} />
                <span className="hidden md:inline ml-1">Experiences</span>
              </Link>
              {isHoveringPartTime && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-teal-800 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
                  Few Experiences
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringTerms(true)}
              onMouseLeave={() => setIsHoveringTerms(false)}
            >
              <Link
                href="/Terms&Conditions"
                className={`flex items-center hover:text-teal-400 ${
                  pathname === "/Terms&Conditions" ? "text-teal-800" : ""
                }`}
              >
                <IoDocuments size={30} />
                <span className="hidden md:inline ml-1">Terms</span>
              </Link>
              {isHoveringTerms && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-teal-800 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap md:hidden">
                  Terms & Conditions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
