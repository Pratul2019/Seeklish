import React from "react";

interface CardProps {
  icon: JSX.Element;
  name: string;
  description: string;
  link: string;
  image: string;
}

const HomeCard: React.FC<CardProps> = ({
  icon,
  name,
  description,
  link,
  image,
}) => {
  return (
    <div className="p-2 rounded-xl max-w-lg flex flex-col justify-between overflow-hidden min-h-72 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />{" "}
      {/* Overlay for better text visibility */}
      <p className="text-md mt-4 p-4 relative z-10">{description}</p>
      <div className="flex items-center justify-between rounded-2xl p-4 relative z-10 bg-header">
        <div className="flex gap-2 items-center">
          {icon}
          <h2 className="">{name}</h2>
        </div>
        <a href={link} className="hover:bg-cyan-700 border  bg-header rounded-2xl p-2 px-4">
          Explore
        </a>
      </div>
    </div>
  );
};

export default HomeCard;
