"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosMore,
} from "react-icons/io";
import { Rental } from "@/Components/types";
import Image from "next/image";

import { useSession } from "next-auth/react";
import Modal from "@/Components/Comp_Indv/Modal";
import Link from "next/link";
import Moment from "react-moment";
import ConditionalProfilePicture from "@/Components/Comp_Indv/ConditionalProfilePicture";
import Dropdown from "../(Components)/Dropdown";
import Like from "../(Components)/Like";
import Comments from "../(Comments)/Comments";

interface RentaluiProps {
  rental: Rental;
}

const Rentalui = ({ rental }: RentaluiProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postUrl, setPostUrl] = useState("");
  const { data: session } = useSession();

  // State to track which modal is open and its caption
  const [isOpen, setIsOpen] = useState(false);
  const [activeCaption, setActiveCaption] = useState<string | null>(null);

  useEffect(() => {
    setPostUrl(`${process.env.NEXT_PUBLIC_API_URL}/rental/${rental._id}`);
  }, [rental._id]);

  const isCurrentUser = session?.user.username === rental.username;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (rental.connectionpost.length + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + rental.connectionpost.length + 1) %
        (rental.connectionpost.length + 1)
    );
  };

  const carouselItems = [rental, ...rental.connectionpost];
  const showNavigation = rental.connectionpost.length > 0;
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewMoreClick = (caption: string) => {
    setActiveCaption(caption);
    setIsOpen(true);
  };
  const handleSignIn = () => {
    setIsLoading(true);
    // The actual redirection will be handled by the Link component
  };

  const renderCarouselItem = (
    item: Rental | Rental["connectionpost"][0],
    index: number
  ) => {
    return (
      <div key={index} className="w-full flex-shrink-0 flex flex-col gap-2">
        <div className="relative w-full aspect-video">
          <Image
            className="absolute object-cover w-full h-full rounded-xl z-10"
            src={item.rentalImage}
            alt=""
            width={1000}
            height={1000}
            style={{ objectFit: "cover" }}
            priority={true}
            
          />
        </div>
        <div className="flex items-center justify-between text-sm md:text-base ml-2">
          <div className="flex items-center gap-2">
            <ConditionalProfilePicture
              username={item.username}
              image={item.image}
              index={index}
              setIsOpen={setIsOpenProfile}
            />
            <div className="flex flex-col max-w-xs">
              <div className="text-sm">{item.name}</div>
              <Moment className="text-xs font-extralight text-gray-500" fromNow>
                {new Date(item.createdAt)}
              </Moment>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-b-xl flex flex-col">
          <h3>{item.rentalName}</h3>
          <p className="text-sm break-words flex gap-2 items-center">
            {item.caption.substring(0, 45)}
            {item.caption.length > 45 && (
              <span
                className="text-teal-600 cursor-pointer"
                onClick={() => handleViewMoreClick(item.caption)}
              >
                <IoIosMore size={20} />
              </span>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="w-full">
        <Suspense fallback={<div>{/* <Loading /> */}</div>}>
          <div className="flex items-center justify-between p-2">
            <div className="flex">
              {showNavigation && currentIndex > 0 ? (
                <button onClick={handlePrev} className=" hover:text-teal-500">
                  <IoIosArrowDropleft size={20} />
                </button>
              ) : (
                <div className="w-6"></div>
              )}

              {showNavigation ? (
                <button onClick={handleNext} className=" hover:text-teal-500">
                  <IoIosArrowDropright size={20} />
                </button>
              ) : (
                <div className="w-6"></div>
              )}
            </div>

            <div>
              {rental.place && (
                <div className="flex flex-col">
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      rental.place
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-light text-xs"
                  >
                    {rental.place.substring(0, 50)}..
                  </a>
                </div>
              )}
            </div>

            <div>
              <Dropdown
                postUrl={postUrl}
                isCurrentUser={isCurrentUser}
                postid={rental._id}
                model="Rental"
              />
            </div>
          </div>

          {/* Carousel */}
          <div className="relative ">
            <div className="overflow-hidden bg-header rounded-t-3xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {carouselItems.map(renderCarouselItem)}
              </div>
            </div>
          </div>

          <div className=" flex justify-around p-2 bg-header rounded-b-3xl">
            <div className=" flex justify-center ">
              <Like id={rental._id} model="Rental" likes={rental.like} />
            </div>
            <Comments
              id={rental._id}
              user={rental.username}
              model="Rental"
              comments={rental.comment}
            />
          </div>
        </Suspense>
      </div>

      {/* Modal for viewing full caption */}
      {isOpen && (
        <Modal title="Caption" setIsOpen={setIsOpen}>
          <p className="text-sm text-start whitespace-pre-wrap">
            {activeCaption}
          </p>
        </Modal>
      )}
      {/* Modal for profile */}
      {isOpenProfile && (
        <Modal title="Let's get Started" setIsOpen={setIsOpenProfile}>
          <p className="mb-4 text-center">
            can&apos;t view profile without signing in!
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
    </main>
  );
};

export default Rentalui;
