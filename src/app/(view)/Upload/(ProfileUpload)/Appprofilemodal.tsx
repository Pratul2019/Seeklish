"use client"

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import type { App } from "@/Components/types";
import PostDetails from "@/Components/UploadComp/PostDetails";

interface AppModalProps {
  app: App;
  onClose: () => void; 
}

export default function Appprofilemodal({
  app,
  onClose,
}: AppModalProps) {
  const { data: session } = useSession();
  const [appName, setAppName] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (loading || !session?.user) return ('/');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/connectionpost/appupload`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            postid: app._id,
            profileusername: app.username,
            currentusername: session.user.username,
            appName,
            caption,
          }),
        }
      );
      if (res.ok) {
        window.location.reload(); // Refresh the page if the response is OK
      }
      onClose();
      setLoading(false);
      
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
        
        <PostDetails
        postName={appName}
        setPostName={setAppName}
        caption={caption}
        setCaption={setCaption}
      />
        <button
          className=" mt-4 hover:text-cyan-500 cursor-pointer p-2 rounded-3xl text-lg "
          onClick={handleUpload}
          disabled={
            !caption  || !appName || loading
          }
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
