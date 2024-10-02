"use client";

import React, { useState, useEffect } from "react";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Image from "next/image";
import { User } from "@/Components/types";
import Modal from "@/Components/Comp_Indv/Modal";
import DeleteModal from "@/Components/Comp_Indv/Deletemodal";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";
import AudienceModal from "./Audience";
import ConnectionsModal from "./Connection";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface ProfileHeaderProps {
  user: User;
  currentUser: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, currentUser }) => {
  const [isExplorer, setIsExplorer] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [audienceCount, setAudienceCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [IsHomeHover, setHomeHover] = useState(false);

  useEffect(() => {
    setIsExplorer(!!user?.audience?.[currentUser]);
    setAudienceCount(user?.audience ? Object.keys(user.audience).length : 0);
    setConnectionCount(
      user?.connections ? Object.keys(user.connections).length : 0
    );
  }, [user, currentUser]);

  const handleDelete = async () => {
    if (isDeleting) return; // Prevent multiple delete requests

    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Delete/accountdelete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        }
      );

      if (res.ok) {
        setShowDeleteModal(false);
        window.location.href = "/";
      } else {
        console.error("Error deleting account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExplorer = async () => {
    const action = isExplorer ? "Unsync" : "Sync";
    try {
      const response = await fetch(`/api/Sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUser,
          profileUser: user.username,
          action,
          profileUsername: user.name,
          profileUserimage: user.image,
        }),
      });

      if (response.ok) {
        setIsExplorer(!isExplorer);
        setAudienceCount((prev) => (isExplorer ? prev - 1 : prev + 1));
      } else {
        console.error(
          `Error performing ${action} action:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating explorer status:", error);
    }
  };

  return (
    <div className="container min-w-full p-4 bg-header rounded-3xl">
      <div className="flex justify-center p-2 gap-6 items-center mb-4">
        <div
          className="relative"
          onMouseEnter={() => setHomeHover(true)}
          onMouseLeave={() => setHomeHover(false)}
        >
          <Link href="/">
            <FaHome
              size={30}
              className="hover:text-teal-300 transition-colors duration-300"
            />
          </Link>
          {IsHomeHover && (
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-teal-500 border bg-header p-2 rounded-3xl shadow-md text-xs whitespace-nowrap">
              Back to Home
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-4">
          {currentUser === user.username && (
            <TiThMenu
              size={25}
              onClick={() => setIsOptionsModalOpen(true)}
              className="cursor-pointer hover:text-teal-500"
            />
          )}
          <Image
            src={user.image}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-lg"
            alt={user.name}
            width={96}
            height={96}
            priority
          />
          <div className="flex flex-col items-center">
            <h1 className="text-xl">{user.name}</h1>
            {currentUser === user.username && (
              <div className="text-sm">@{user.username}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4 sm:mt-0">
          {currentUser !== user.username && (
            <button
              onClick={handleExplorer}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isExplorer
                  ? "border-teal-900 border hover:bg-teal-600"
                  : "border-current border hover:bg-teal-900"
              }`}
            >
              {isExplorer ? "Unsync" : "Sync"}
            </button>
          )}
          <div className="flex space-x-6 text-sm">
            <span
              onClick={() => setShowAudienceModal(true)}
              className="cursor-pointer hover:underline"
            >
              Audience&nbsp;&nbsp;{audienceCount > 0 && audienceCount}
            </span>
            {audienceCount > 0 && connectionCount > 0 && <span>•</span>}
            <span
              onClick={() => setShowConnectionsModal(true)}
              className="cursor-pointer hover:underline"
            >
              Connections&nbsp;&nbsp;{connectionCount > 0 && connectionCount}
            </span>
          </div>
        </div>
      </div>

      {isOptionsModalOpen && currentUser === user.username && (
        <Modal title="Profile Options" setIsOpen={setIsOptionsModalOpen}>
          <div className="p-2 text-sm grid space-y-6">
            <button
              onClick={() => {
                setIsOptionsModalOpen(false);
                setIsEditProfileModalOpen(true);
              }}
              className="flex items-center gap-2 bg-teal-600 justify-center hover:bg-teal-500 cursor-pointer p-3 rounded-2xl w-48 mx-auto"
            >
              <FaUserEdit size={26} />
              <span>Edit Profile</span>
            </button>
            <Link
              href="/Upload"
              className="flex items-center gap-2 bg-teal-600 justify-center hover:bg-teal-500 cursor-pointer p-3 rounded-2xl w-48 mx-auto"
            >
              <MdOutlineAddPhotoAlternate size={26} />
              <span>Share</span>
            </Link>
            <button
              onClick={() => {
                setIsOptionsModalOpen(false);
                setShowDeleteModal(true);
              }}
              className="flex items-center gap-2 bg-teal-600 justify-center hover:bg-teal-500 cursor-pointer p-3 rounded-2xl w-48 mx-auto"
            >
              <RiDeleteBinLine size={25} />
              <span>Delete Account</span>
            </button>
          </div>
        </Modal>
      )}

      {isEditProfileModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {showAudienceModal && (
        <AudienceModal
          audience={Object.entries(user?.audience || {}).map(
            ([username, data]) => ({
              username,
              ...data,
            })
          )}
          onClose={() => setShowAudienceModal(false)}
          // currentuser={user.username}
        />
      )}

      {showConnectionsModal && (
        <ConnectionsModal
          connections={Object.entries(user?.connections || {}).map(
            ([username, data]) => ({
              username,
              ...data,
            })
          )}
          onClose={() => setShowConnectionsModal(false)}
          currentuser={currentUser}
          profileUser={user.username}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
