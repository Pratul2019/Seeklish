"use client";

import ConditionalProfilePicture from "@/Components/Comp_Indv/ConditionalProfilePicture";
import Modal from "@/Components/Comp_Indv/Modal";

import Link from "next/link";
import { useState } from "react";

interface SearchProps {
  results: {
    name: string;
    username: string;
    image: string;
    audience: {
      [username: string]: { name: string; image: string };
    };
  }[];
  // searchTerm: string;
}

const UserSearch = ({ results }: SearchProps) => {
  
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
  };

  return (
    <div className="py-8">
      {results.length === 0 ? (
        <p className="text-gray-400">No Users found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="flex items-center space-x-4">
              <ConditionalProfilePicture
                username={result.username}
                image={result.image}
                index={index}
               
                setIsOpen={setIsOpenProfile}
              />
              <div>
                <h3 className="text-lg font-bold">{result.name}</h3>
                <p className="text-xs">
                  Audience: {Object.keys(result.audience).length ?? 0}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpenProfile && (
        <Modal title="Let's get Started" setIsOpen={setIsOpenProfile}>
          <p className="mb-4 text-center">
          Can&apos;t view profile without signing in!
          </p>
          <Link href="/signin" passHref>
            <button
              className={`bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-xl relative ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Sign In / Register</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                </>
              ) : (
                "Sign In / Register"
              )}
            </button>
          </Link>
        </Modal>
      )}
    </div>
  );
};

export default UserSearch;
