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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl bg-header">
        <div className="flex justify-between items-center py-4">
          <div 
            className="relative" 
            onMouseEnter={() => setHomeHover(true)} 
            onMouseLeave={() => setHomeHover(false)}
          >
            <Link href="/">
              <FaHome 
                size={30} 
                className={`hover:text-cyan-300 transition-colors duration-300 ${
                  pathname === "/" ? "text-cyan-500" : ""
                }`} 
              />
            </Link>
            {isHomeHover && (
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
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
              <Link href="/Oppurtunity">
                <MdWork 
                  size={30} 
                  className={`hover:text-cyan-500 ${
                    pathname === "/Oppurtunity" ? "text-cyan-500" : ""
                  }`} 
                />
              </Link>
              {isHoveringPartTime && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
                  Few Experiences
                </div>
              )}
            </div>
            <div 
              className="relative" 
              onMouseEnter={() => setIsHoveringTerms(true)} 
              onMouseLeave={() => setIsHoveringTerms(false)}
            >
              <Link href="/Terms&Conditions">
                <IoDocuments 
                  size={30} 
                  className={`hover:text-cyan-500 ${
                    pathname === "/Terms&Conditions" ? "text-cyan-500" : ""
                  }`} 
                />
              </Link>
              {isHoveringTerms && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-cyan-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
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