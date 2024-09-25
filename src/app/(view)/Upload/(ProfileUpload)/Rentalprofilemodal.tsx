"use client"

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { Rental } from "@/Components/types";
import ImageUpload from "@/Components/UploadComp/ImageUpload";
import PostDetails from "@/Components/UploadComp/PostDetails";

interface RentalModalProps {
  rental: Rental;
  onClose: () => void; 
}

export default function Rentalprofilemodal({
  rental,
  onClose,
}: RentalModalProps) {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [rentalName, setRentalName] = useState("");
  const [caption, setCaption] = useState("");
 
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (loading || !session?.user) return ('/');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/connectionpost/rentalupload`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            postid: rental._id,
            profileusername: rental.username,
            currentusername: session.user.username,
            rentalName,
            caption,
            rentalImage: selectedFile,
          }),
        }
      );
      if (res.ok) {
        window.location.reload(); // Refresh the page if the response is OK
      }
      onClose();
      setLoading(false);
      setSelectedFile(null);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-header p-6 rounded-3xl max-w-md w-full relative flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add to Post</h2>
          <IoCloseCircleOutline size={30} onClick={onClose} className="close-icon cursor-pointer" />
        </div>
        
        <ImageUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <PostDetails
        postName={rentalName}
        setPostName={setRentalName}
        caption={caption}
        setCaption={setCaption}
      />
        {/* <LocationSearch onPlaceSelected={setPlace} /> */}
        <button
          className="mt-4 hover:text-cyan-500 cursor-pointer p-2 rounded-3xl text-lg"
          onClick={handleUpload}
          disabled={
            !selectedFile || !caption  || !rentalName || loading
          }
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
