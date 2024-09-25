"use client";

import React, { useState } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { MdAppShortcut } from "react-icons/md";
import { SiWpexplorer } from "react-icons/si";
import ProfileDiscover from "./ProfileDiscover";
import ProfileRental from "./ProfileRental";
import ProfileApp from "./ProfileApplication";



interface TabsProps {
  discoverpro: [];
  rentalpro: [];
  applicationpro: [];
  isAllowed: boolean;
  profileCounts: {
    discoverCount: number;
    rentalCount: number;
    applicationCount: number;
  };
}

export default function Tabs({
  discoverpro,
  rentalpro,
  applicationpro,
  isAllowed,
  profileCounts,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState("discover");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex gap-12 mt-6 justify-center">
        <div
          className={`flex gap-3 items-center ${
            activeTab === "discover" ? "text-cyan-500" : ""
          }`}
          onClick={() => handleTabChange("discover")}
        >
          <SiWpexplorer size={30}  className="cursor-pointer"/>
          <span className="text-gray-400">{profileCounts.discoverCount}</span>
        </div>
        <div
          className={`flex gap-3 items-center ${
            activeTab === "rental" ? "text-cyan-500" : ""
          }`}
          onClick={() => handleTabChange("rental")}
        >
          <HiHomeModern size={30}  className="cursor-pointer"/>
          <span className=" text-gray-400">{profileCounts.rentalCount}</span>
        </div>
        <div
          className={`flex gap-3 items-center ${
            activeTab === "application" ? "text-cyan-500" : ""
          }`}
          onClick={() => handleTabChange("application")}
        >
          <MdAppShortcut size={30} className="cursor-pointer"/>
          <span className="text-gray-400">{profileCounts.applicationCount}</span>
        </div>
      </div>

      {activeTab === "discover" && <ProfileDiscover discoverpro={discoverpro} isAllowed={isAllowed}/>}
      {activeTab === "rental" && <ProfileRental rentalpro={rentalpro} isAllowed={isAllowed}/>}
      {activeTab === "application" && (
        <ProfileApp apppro={applicationpro} isAllowed={isAllowed}/>
      )}
    </div>
  );
}