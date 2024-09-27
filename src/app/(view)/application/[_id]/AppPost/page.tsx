"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { App } from "@/Components/types";
import Modal from "@/Components/Comp_Indv/Modal";
import Moment from "react-moment";
import { Connectiondelete } from "@/app/(view)/(Components)/Connectiondelete";
import Like from "@/app/(view)/(Components)/Like";
import Comments from "@/app/(view)/(Comments)/Comments";
import Dropdown from "@/app/(view)/(Components)/Dropdown";
import ConditionalProfilePicture from "@/Components/Comp_Indv/ConditionalProfilePicture";

interface AppModalProps {
  app: App;
}

export default function AppModal({ app }: AppModalProps) {
  const { data: session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = () => {
    setIsLoading(true);
    // The actual redirection will be handled by the Link component
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (app.connectionpost.length + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + app.connectionpost.length + 1) %
        (app.connectionpost.length + 1)
    );
  };
  const carouselItems = Array.isArray(app.connectionpost)
    ? [app, ...app.connectionpost]
    : [app];

  const showNavigation =
    Array.isArray(app.connectionpost) && app.connectionpost.length > 0;

  const postUrl = `${process.env.NEXT_PUBLIC_API_URL}/application/${app._id}?from=link`;
  const isCurrentUser = session?.user.username === app.username;

  const renderCarouselItem = (
    item: App | App["connectionpost"][0],
    index: number
  ) => (
    <div key={index} className="w-full flex-shrink-0 flex flex-col gap-2">
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
            postId={app._id}
            connectionpostId={item._id}
            iscurrentUser={isCurrentUser}
            model="App"
          />
        )}
      </div>
      <div className="p-2 rounded-b-xl flex flex-col gap-2">
        <h3 className="text-lg">{item.appName}</h3>
        <p className="text-sm w-auto break-words">{item.caption}</p>
      </div>
    </div>
  );

  return (
    
      <div className="max-w-2xl w-full mx-auto my-16 shadow-xl bg-header rounded-2xl">
        <div className="flex flex-col max-h-[calc(100vh-4rem)]">
          {/* Top navigation bar */}
          <div className="flex items-center w-full p-2 border-b border-gray-700">
          <div className="w-[10%] flex justify-start">
            {showNavigation && currentIndex > 0 && (
              <button onClick={handlePrev} className="hover:text-teal-500">
                <IoIosArrowDropleft size={20} />
              </button>
            )}
          </div>
          <div className="w-[80%] text-center">
            {app.place && (
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  app.place
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light truncate hover:underline"
              >
                {app.place}
              </a>
            )}
          </div>
          <div className="w-[10%] flex justify-end">
            {showNavigation && (
              <button onClick={handleNext} className="hover:text-teal-500">
                <IoIosArrowDropright size={20} />
              </button>
            )}
          </div>
        </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto">
            <div className="p-2">
              {/* Carousel */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {carouselItems.map(renderCarouselItem)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 p-2 mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <Like id={app._id} model="App" likes={app.like} />
              </div>

              <div className="w-full mx-2">
                <Comments
                  id={app._id}
                  model="App"
                  comments={app.comment}
                  user={app.username}
                />
              </div>

              <div className="flex justify-center">
                <Dropdown
                  postUrl={postUrl}
                  isCurrentUser={isCurrentUser}
                  postid={app._id}
                  model="App"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Modal for profile */}
        {isOpenProfile && (
          <Modal title="Let's get Started" setIsOpen={setIsOpenProfile}>
            <p className="mb-4 text-center">
              Can&apos;t comment without signing in!
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
}
