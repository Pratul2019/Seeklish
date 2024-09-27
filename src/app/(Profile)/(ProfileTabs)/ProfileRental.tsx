"use client";

import Rentalprofilemodal from "@/app/(view)/Upload/(ProfileUpload)/Rentalprofilemodal";
import RentalModal from "@/Components/Share_Models/RentalModal";

import { Rental } from "@/Components/types";
import Image from "next/image";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface ProfileRentalProps {
  rentalpro: Rental[];
  isAllowed: boolean;
}

const ProfileRental: React.FC<ProfileRentalProps> = ({
  rentalpro,
  isAllowed,
}) => {
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [modalType, setModalType] = useState<"upload" | "view" | null>(null);
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});

  const handleNext = (rentalproId: string) => {
    setCurrentIndices((prevIndices) => {
      const rental = rentalpro.find((d) => d._id === rentalproId);
      const maxIndex = (rental?.connectionpost?.length || 0) + 1;
      const currentIndex = prevIndices[rentalproId] || 0;
      return {
        ...prevIndices,
        [rentalproId]: (currentIndex + 1) % maxIndex,
      };
    });
  };

  const handlePrev = (rentalproId: string) => {
    setCurrentIndices((prevIndices) => {
      const rental = rentalpro.find((d) => d._id === rentalproId);
      const maxIndex = (rental?.connectionpost?.length || 0) + 1;
      const currentIndex = prevIndices[rentalproId] || 0;
      return {
        ...prevIndices,
        [rentalproId]: (currentIndex - 1 + maxIndex) % maxIndex,
      };
    });
  };

  const handleRentalClick = (rental: Rental) => {
    setSelectedRental(rental);
    setModalType("view");
  };

  const handleUploadModalOpen = (rental: Rental) => {
    setSelectedRental(rental);
    setModalType("upload");
  };

  const handleCloseModal = () => {
    setSelectedRental(null);
    setModalType(null);
  };

  return (
    <div className="container mt-10">
      {rentalpro.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {rentalpro.map((rental) => {
            const carouselItems = [rental, ...(rental.connectionpost || [])];
            const currentIndex = currentIndices[rental._id] || 0;
            const currentItem = carouselItems[currentIndex];

            return (
              <div
                key={rental._id}
                className="flex flex-col gap-2 items-center m-2"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-end">
                      {currentIndex > 0 && (
                        <button
                          onClick={() => handlePrev(rental._id)}
                          className="hover:text-teal-500"
                        >
                          <IoIosArrowDropleft size={20} />
                        </button>
                      )}
                      {carouselItems.length > 1 && (
                        <button
                          onClick={() => handleNext(rental._id)}
                          className="hover:text-teal-500"
                        >
                          <IoIosArrowDropright size={20} />
                        </button>
                      )}
                    </div>
                    <div className="h-5"></div>
                    {isAllowed && (rental.connectionpost?.length || 0) < 5 && (
                      <div className="cursor-pointer z-10">
                        <CiSquarePlus
                          size={25}
                          onClick={() => handleUploadModalOpen(rental)}
                          className="hover:text-teal-500 "
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 items-center w-full md:w-64 xl:w-80">
                    <div
                      onClick={() => handleRentalClick(rental)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={currentItem.rentalImage}
                        alt=""
                        width={1000}
                        height={1000}
                        className="object-cover rounded-3xl w-full h-48 md:h-64 xl:h-80"
                        priority={true}
                      />
                    </div>
                    <div className="text-sm text-center w-full break-words">
                      {currentItem.rentalName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modalType === "upload" && selectedRental && (
        <Rentalprofilemodal
          rental={selectedRental}
          onClose={handleCloseModal}
        />
      )}
      {modalType === "view" && selectedRental && (
        <RentalModal rental={selectedRental} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProfileRental;
