import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { User } from "@/Components/types";
import ImageUpload from "@/Components/UploadComp/ImageUpload";
import Modal from "@/Components/Comp_Indv/Modal";

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!session?.user.username) {
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/Updateprofile`,
        {
          name,
          image: selectedFile,
          username: user.username,
        }
      );
      setResponseStatus(response.status);
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
        setIsOpen(true);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleClose() {
    onClose();
    setIsOpen(false);
    window.location.href = window.location.href;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-header rounded-3xl shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Update Profile Picture/Name</h2>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          <div className="mb-6">
            <div className="mx-auto rounded-3xl overflow-hidden">
              <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Update Name"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
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
            <p className="mb-4 text-center">Updated Successfully</p>
          ) : responseStatus === 404 ? (
            <p className="mb-4 text-center">Update Unsuccessful</p>
          ) : (
            <p className="mb-4 text-center">
              Failed to post. Please check your network connection.
            </p>
          )}
          {responseStatus === 200 ? (
            <button
              className="bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-xl relative"
              onClick={handleClose}
            >
              Okay
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-xl relative"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          )}
        </Modal>
      )}
    </div>
  );
};

export default EditProfileModal;