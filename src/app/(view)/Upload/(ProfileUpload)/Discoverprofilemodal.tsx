"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { Discover } from "@/Components/types";
import ImageUpload from "@/Components/UploadComp/ImageUpload";
import PostDetails from "@/Components/UploadComp/PostDetails";

interface DiscoverModalProps {
  discover: Discover;
  onClose: () => void;
}

export default function Discoverprofilemodal({
  discover,
  onClose,
}: DiscoverModalProps) {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [discoverName, setDiscoverName] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (loading || !session?.user) return ('/');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/connectionpost/discoverupload`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            postid: discover._id,
            profileusername: discover.username,
            currentusername: session.user.username,
            discoverName,
            caption,
            discoverImage: selectedFile,
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
          <IoCloseCircleOutline size={30} onClick={onClose} className="hover:text-red-500 cursor-pointer" />
        </div>

        <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <PostDetails postName={discoverName} setPostName={setDiscoverName} caption={caption} setCaption={setCaption} />

        <button
          className="mt-4 hover:text-cyan-500 cursor-pointer p-2 rounded-3xl text-lg"
          onClick={handleUpload}
          disabled={!selectedFile || !caption || !discoverName || loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
