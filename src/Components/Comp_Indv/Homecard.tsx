import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardProps {
  icon: JSX.Element;
  name: string;
  description: string;
  link: string;
  image: StaticImageData;
}

const HomeCard: React.FC<CardProps> = ({
  icon,
  name,
  description,
  link,
  image,
}) => {
  return (
    <div className="p-2 rounded-3xl max-w-lg flex flex-col justify-between overflow-hidden min-h-72 relative">
      <Image
        src={image}
        alt=""
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="absolute inset-0 z-0 opacity-40"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* Overlay for better text visibility */}
      <p className="text-md mt-2 p-4 relative z-10 ">{description}</p>
      <div className="flex items-center justify-between rounded-2xl p-4 relative z-10 bg-header">
        <div className="flex gap-2 items-center">
          {icon}
          <h2 className="">{name}</h2>
        </div>
        <Link href={link} legacyBehavior>
          <div className="hover:bg-teal-400 bg-teal-800 rounded-xl p-2 px-6 cursor-pointer">
            <a>Explore</a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
