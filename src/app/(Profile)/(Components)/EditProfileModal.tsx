"use client";
import axios from 'axios';
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { User } from "@/Components/types";
import ImageUpload from '@/Components/UploadComp/ImageUpload';


interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { data: session, update } = useSession();
 
  const handleSave = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Profile/Updateprofile`, {
        name,
        image: selectedFile,
        username: user.username,
      });

      if (response.status === 200) {
        const { name, image } = response.data.data;
        await update({
          ...session,
          user: {
            ...session?.user,
            name,
            image,
          },
        });
        onClose();
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-header rounded-3xl shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Update Profile Picture/Name</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-6">
            <div className=" mx-auto rounded-3xl overflow-hidden ">
              <ImageUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Update Name"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
