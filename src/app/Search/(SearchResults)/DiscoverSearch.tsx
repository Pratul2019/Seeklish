"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Discover } from "@/Components/types";
import Modal from "@/Components/Comp_Indv/Modal";
import { IoIosMore } from "react-icons/io";
import DiscoverModal from "@/Components/Share_Models/DiscoverModal";
import ConditionalProfilePicture from "@/Components/Comp_Indv/ConditionalProfilePicture";
import Like from "@/app/(view)/(Components)/Like";
import Comments from "@/app/(view)/(Comments)/Comments";
// Adjust the import path as necessary

interface DiscoverSearchProps {
  results: Discover[];
}

const DiscoverSearch = ({ results: initialResults }: DiscoverSearchProps) => {
 
  
  const [selectedDiscover, setSelectedDiscover] =
    useState<Discover | null>(null);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [activeCaption, setActiveCaption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleDiscoverClick = (discover: Discover) => {
    setSelectedDiscover(discover);
  };

  const handleCloseModal = () => {
    setSelectedDiscover(null);
  };

  const handleViewMoreClick = (caption: string) => {
    setActiveCaption(caption);
    setIsOpen(true);
  };
  const handleSignIn = () => {
    setIsLoading(true);
    // The actual redirection will be handled by the Link component
  };

  return (
    <div className="max-w-full  mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {initialResults.length === 0 ? (
        <div className="text-gray-600 text-center">No Results found</div>
      ) : (
        initialResults.map((result, index) => (
          <div key={index} className="flex flex-col gap-2">
            <p className="ml-4">{result.discoverName}</p>
            <div
              onClick={() => handleDiscoverClick(result)}
              className="cursor-pointer"
            >
              <Image
                className="rounded-xl object-cover h-80 "
                src={result.discoverImage}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="flex items-center justify-between gap-2 my-2">
              <div className="flex gap-2 items-center">
                <ConditionalProfilePicture
                  username={result.username}
                  image={result.image}
                  index={index}
                  
                  setIsOpen={setIsOpenProfile}
                />
                <h3 className="text-sm">{result.name}</h3>
              </div>
              <div className=" flex justify-center gap-2 mr-4">
                <Like id={result._id} model="Discover" likes={result.like} />
                <Comments
                  id={result._id}
                  user={result.username}
                  model="Discover"
                  comments={result.comment}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm break-words flex gap-2 items-center ml-4">
                {result.caption.substring(0, 45)}
                {result.caption.length > 45 && (
                  <span
                    className="text-teal-600 cursor-pointer"
                    onClick={() => handleViewMoreClick(result.caption)}
                  >
                    <IoIosMore size={20} />
                  </span>
                )}
              </p>
            </div>
          </div>
        ))
      )}

      {selectedDiscover && (
        <DiscoverModal
          discover={selectedDiscover}
          onClose={handleCloseModal}
        />
      )}
      {isOpen && (
        <Modal title="Caption" setIsOpen={setIsOpen}>
          <p className="text-sm text-start">{activeCaption}</p>
        </Modal>
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

export default DiscoverSearch;
