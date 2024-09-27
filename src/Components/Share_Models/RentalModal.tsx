"use client";

import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosClose } from "react-icons/io";
import Image from "next/image";
import { Rental } from "@/Components/types";
import Modal from "@/Components/Comp_Indv/Modal";
import Moment from "react-moment";
import { usePathname } from "next/navigation";
import ConditionalProfilePicture from "../Comp_Indv/ConditionalProfilePicture";
import { Connectiondelete } from "@/app/(view)/(Components)/Connectiondelete";
import Like from "@/app/(view)/(Components)/Like";
import Comments from "@/app/(view)/(Comments)/Comments";
import Dropdown from "@/app/(view)/(Components)/Dropdown";

interface RentalModalProps {
  rental: Rental;
  onClose: () => void;
}

export default function RentalModal({ rental, onClose }: RentalModalProps) {
  const { data: session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const pathname = usePathname();

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (rental.connectionpost.length + 1));
  }, [rental.connectionpost.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + rental.connectionpost.length + 1) % (rental.connectionpost.length + 1)
    );
  }, [rental.connectionpost.length]);

  const carouselItems = Array.isArray(rental.connectionpost)
    ? [rental, ...rental.connectionpost]
    : [rental];

  const showNavigation = Array.isArray(rental.connectionpost) && rental.connectionpost.length > 0;
  const postUrl = `${process.env.NEXT_PUBLIC_API_URL}/rental/${rental._id}?from=link`;
  const isCurrentUser = session?.user.username === rental.username;

  const renderCarouselItem = useCallback((item: Rental | Rental['connectionpost'][0], index: number) => (
    <div key={index} className="w-full flex-shrink-0 flex flex-col gap-2">
      <Image
        className="w-full h-auto object-cover rounded-xl"
        src={item.rentalImage}
        alt={item.rentalName}
        width={1000}
        height={1000}
        quality={100}
        loading="lazy"
      />
      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center space-x-3">
          <ConditionalProfilePicture
            username={item.username}
            image={item.image}
            index={index}
            
            setIsOpen={setIsOpenProfile}
          />
          <div className="flex flex-col min-w-0 flex-shrink">
            <div className="text-sm font-medium truncate">{item.name}</div>
            <Moment className="text-xs font-extralight text-gray-500" fromNow>
                {new Date(item.createdAt)}
              </Moment>
          </div>
        </div>
        {index !== 0 && (
          <Connectiondelete
            postId={rental._id}
            connectionpostId={item._id}
            iscurrentUser={isCurrentUser}
            model="Rental"
          />
        )}
      </div>
      <div className="p-2 rounded-b-xl flex flex-col gap-2">
        <h3 className="text-lg">{item.rentalName}</h3>
        <p className="text-sm w-auto break-words">{item.caption}</p>
      </div>
    </div>
  ), [ isCurrentUser, rental._id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="bg-header rounded-3xl max-w-2xl w-full mx-auto my-8 shadow-xl">
        <div className="flex flex-col max-h-[calc(100vh-4rem)]">
          <div className="flex justify-between p-2 border-b border-gray-700">
            <div className="flex items-center">
              {showNavigation && currentIndex > 0 && (
                <button onClick={handlePrev} className="hover:text-teal-500">
                  <IoIosArrowDropleft size={20} />
                </button>
              )}
              {showNavigation && (
                <button onClick={handleNext} className="hover:text-teal-500 ">
                  <IoIosArrowDropright size={20} />
                </button>
              )}
            </div>

            <div>
            {rental.place && (
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(rental.place)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light truncate hover:underline"
              >
                {rental.place}
              </a>
            )}
            </div>
            {pathname.startsWith("/rental/") ? (
              <Link href="/rental">
                <IoIosClose size={25} className="hover:text-red-500" />
              </Link>
            ) : (
              <button onClick={onClose} className="hover:text-red-500">
                <IoIosClose size={25} />
              </button>
            )}
          </div>
          <div className="overflow-y-auto">
            <div className="p-2">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {carouselItems.map(renderCarouselItem)}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 p-2 mt-auto">
            <div className="flex justify-between items-center">
              <Like id={rental._id} model="Rental" likes={rental.like} />
              <div className="w-full mx-2">
                <Comments
                  id={rental._id}
                  model="Rental"
                  comments={rental.comment}
                  user={rental.username}
                />
              </div>
              <Dropdown
                postUrl={postUrl}
                isCurrentUser={isCurrentUser}
                postid={rental._id}
                model="Rental"
              />
            </div>
          </div>
        </div>
        {isOpenProfile && (
          <Modal title="Let's get Started" setIsOpen={setIsOpenProfile}>
            <p className="mb-4 text-center">
            can&apos;t view profile without signing in!
            </p>
            <Link href="/signin" className="bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-xl text-center block">
              Sign In / Register
            </Link>
          </Modal>
        )}
      </div>
    </div>
  );
}