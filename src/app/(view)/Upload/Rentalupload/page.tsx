"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/Components/Comp_Indv/Modal";
import Link from "next/link";
import ImageUpload from "@/Components/UploadComp/ImageUpload";
import LocationSearch from "@/Components/UploadComp/LocationSearch";
import PostDetails from "@/Components/UploadComp/PostDetails";

export default function RentalUpload() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [rentalName, setRentalName] = useState("");
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    if (loading || !session?.user?.username) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Upload/Rentalupload`,
        {
          username: session.user.username,
          rentalName,
          caption,
          place: place?.formatted_address,
          rentalImage: selectedFile,
        }
      );
      setResponseStatus(response.status);
      setIsOpen(true);

      if (response.status === 200) {
        setRentalName("");
        setCaption("");
        setPlace(null);
        setSelectedFile(null);
      }
      setLoading(false);
    } catch (error) {
      setResponseStatus(500);
      setIsOpen(true);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <ImageUpload
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <div className="flex flex-col space-y-6">
        <LocationSearch onPlaceSelected={setPlace} />
        <PostDetails
          postName={rentalName}
          setPostName={setRentalName}
          caption={caption}
          setCaption={setCaption}
        />
        <div className="w-full flex justify-end gap-4">
          <button
            className={`bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-colors ${
              loading || !caption || !rentalName
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            type="button"
            onClick={handleUpload}
            disabled={loading || !caption || !rentalName}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          <Link href="/rental">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors">
              Close
            </button>
          </Link>
        </div>
      </div>
      {isOpen && (
        <Modal
          title={
            responseStatus === 200
              ? "Congrats"
              : responseStatus === 404
              ? "Oops!"
              : "Error"
          }
          setIsOpen={setIsOpen}
        >
          {responseStatus === 200 ? (
            <p className="mb-4 text-center">Uploaded Successfully</p>
          ) : responseStatus === 404 ? (
            <p className="mb-4 text-center">Upload Unsuccessful</p>
          ) : (
            <p className="mb-4 text-center">
              Failed to post. Please check your network connection.
            </p>
          )}
          {responseStatus === 200 ? (
            <Link href="/rental">
              <button className="bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-xl relative">
                Okay
              </button>
            </Link>
          ) : (
            <Link href="/Upload/Appupload">
              <button className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-xl relative">
                Try Again
              </button>
            </Link>
          )}
        </Modal>
      )}
    </div>
  );
}
