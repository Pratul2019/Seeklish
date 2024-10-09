"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { SiWpexplorer } from "react-icons/si";
import { HiHomeModern } from "react-icons/hi2";

import Loading from "./loading";
import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

import UserSearch from "./(SearchResults)/UserSearch";
import RentalSearch from "./(SearchResults)/RentalSearch";
import DiscoverSearch from "./(SearchResults)/DiscoverSearch";
import TabButton from "./(SearchResults)/TabButton";
import Menu from "../(view)/(Components)/Menu";

type TabType = "User" | "Rental" | "Discover" | null;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [rentalResults, setRentalResults] = useState([]);
  const [discoverResults, setDiscoverResults] = useState([]);
  const [currentTab, setCurrentTab] = useState<TabType>(null); // Explicitly typing currentTab
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error can also be null
  const { data: session } = useSession();

  const fetchResults = async (type: "user" | "rental" | "discover") => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/${type}`,
        {
          params: {
            query: encodeURIComponent(searchTerm),
          },
        }
      );

      switch (type) {
        case "user":
          setUserResults(response.data);
          break;
        case "rental":
          setRentalResults(response.data);
          break;
        case "discover":
          setDiscoverResults(response.data);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${type} results:`, error);
      if (axios.isAxiosError(error)) {
        setError(`Error fetching ${type} results: ${error.response?.data?.error || error.message}`);
      } else {
        setError(`An unexpected error occurred while fetching ${type} results.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = async (tab: TabType) => {
    setCurrentTab(tab);
    if (tab) {
      fetchResults(tab.toLowerCase() as "user" | "rental" | "discover");
    }
  };

  const renderSearchComponent = () => {
    switch (currentTab) {
      case "User":
        return <UserSearch results={userResults} />;
      case "Rental":
        return <RentalSearch results={rentalResults} />;
      case "Discover":
        return <DiscoverSearch results={discoverResults} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-6 w-full xl:max-w-5xl justify-center bg-gradient-to-br from-teal-800 to-header rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-4 rounded-lg bg-header">
            <Link href="/" className="flex items-center gap-1 hover:text-teal-400">
              <FaHome
                size={30}
                className="hover:text-teal-300 transition-colors"
              />
              <span className="hidden md:inline-block text-sm mt-1">Home</span>
            </Link>

            <div className="flex gap-6">
              <TabButton
                isActive={currentTab === "User"}
                onClick={() => handleTabChange("User")}
                icon={<FaCircleUser size={30} />}
                disabled={isLoading}
                text=" User"
              />
              
              <TabButton
                isActive={currentTab === "Discover"}
                onClick={() => handleTabChange("Discover")}
                icon={<SiWpexplorer size={30} />}
                disabled={isLoading}
                text=" Discover"
              />
              
              <TabButton
                isActive={currentTab === "Rental"}
                onClick={() => handleTabChange("Rental")}
                icon={<HiHomeModern size={30} />}
                disabled={isLoading}
                text="Rental"
              />
              
            </div>

            <div className="flex items-center">
              {session?.user ? (
                <div
                  className="flex items-center cursor-pointer justify-center"
                  
                >
                  <Link href={`/${session.user.username}`} className="flex items-center gap-1">
                    <Image
                      className="rounded-xl w-9 h-9"
                      src={session.user.image || ""}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                    <span className="hidden md:inline-block mr-1 text-sm hover:text-teal-400">{session.user.name}</span>
                  </Link>
                 
                </div>
              ) : (
                <Link href="/signin" className="flex items-center gap-1 hover:text-teal-400">
                  <RxAvatar size={30} />
                  <span className="hidden md:inline-block mr-1 text-sm ">Signin</span>
                </Link>
              )}
              <div className="mt-2">
                <Menu />
              </div>
            </div>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-transparent rounded-2xl focus:outline-none transition-colors placeholder:text-current"
            placeholder="Search...( User / Place )"
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-6">
            {/* Render the appropriate search component based on the current tab */}
            {renderSearchComponent()}
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
