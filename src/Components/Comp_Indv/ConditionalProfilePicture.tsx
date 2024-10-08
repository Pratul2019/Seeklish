"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ConditionalProfilePictureProps {
  username: string;
  image: string;
  index: number;
  
  setIsOpen: (isOpen: boolean) => void;
}

const ConditionalProfilePicture: React.FC<ConditionalProfilePictureProps> = ({
  username,
  image,
  index,
  
  setIsOpen,
}) => {
  const { data: session } = useSession();

  const handleProfileClick = () => {
    if (!session) {
      setIsOpen(true);
    }
  };

  return (
    <div>
      {index === 0 ? (
        <div
          className="relative p-[2px] rounded-full bg-gradient-to-tr from-teal-500 to-black cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="absolute inset-0 bg-header rounded-full m-2"></div>
          <Link href={session ? `/${username}` : "#"}>
            <Image
              className="rounded-full h-10 w-10 md:h-11 md:w-11 object-cover relative z-10 p-[1px] bg-teal-500"
              src={image}
              alt=""
              width={1000}
              height={1000}
              priority={true}
            />
          </Link>
        </div>
      ) : (
        <Link href={session ? `/${username}` : "#"} className="cursor-pointer">
          <Image
            className="rounded-full h-10 w-10 md:h-11 md:w-11 object-cover"
            src={image}
            alt=""
            width={1000}
            height={1000}
            onClick={handleProfileClick}
            priority={true}
          />
        </Link>
      )}
    </div>
  );
};

export default ConditionalProfilePicture;