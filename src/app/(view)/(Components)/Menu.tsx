"use client";

import React, { useState, useRef, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { MdAssuredWorkload, MdOutlineAddPhotoAlternate } from "react-icons/md";
import Logout from "@/Components/Authentication/Logout";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative dropdown-container" ref={menuRef}>
      <button
        className={`cursor-pointer bg-header ${isOpen ? "text-cyan-700" : ""} hover:text-cyan-700 rounded-full transition-colors duration-300`}
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <TiThMenu size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-2xl shadow-lg bg-header ring-1 ring-black ring-opacity-5 overflow-hidden z-10">
          <ul className="p-2">
            <li>
              <Link
                href="/Oppurtunity"
                className="flex items-center px-4 py-2 rounded-2xl hover-theme-bg hover:text-cyan-600 transition-colors duration-200"
              >
                <MdAssuredWorkload size={25} className="mr-3" />
                Hustle
              </Link>
            </li>
            {session?.user && (
              <li className="mb-2">
                <Link
                  href="/Upload"
                  className="flex items-center px-4 py-2 rounded-2xl hover-theme-bg hover:text-cyan-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <MdOutlineAddPhotoAlternate size={25} className="mr-3" />
                  Share
                </Link>
              </li>
            )}
            {session?.user && (
              <li className="border-t border-gray-400">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Wrap the Menu component with React.memo
export default React.memo(Menu);
