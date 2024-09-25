"use client";

import DeleteModal from "@/Components/Comp_Indv/Deletemodal";
import Share from "@/Components/Comp_Indv/Share";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";

interface DropdownProps {
  postUrl: string;
  isCurrentUser: boolean;
  postid: string;
  model: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  postid,
  postUrl,
  isCurrentUser,
  model,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Delete/postdelete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid, model }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Delete response:", data);
        setShowDeleteModal(false);
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.error("Error deleting post:", errorData);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex gap-2 hover:text-cyan-500"
        onClick={() => setShowDropdown((prev) => !prev)}
        aria-expanded={showDropdown}
        aria-label="Toggle Dropdown"
      >
        <IoIosArrowDropdown size={20} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 border border-cyan-700 p-2 bg-header w-max text-xs rounded-xl z-50">
          <div className="flex gap-2 px-4 py-2 items-center cursor-pointer hover:bg-cyan-700 rounded-xl">
            <Share postUrl={postUrl} />
          </div>
          {isCurrentUser && (
            <div
              onClick={() => setShowDeleteModal(true)}
              className="flex gap-2 px-4 py-2 cursor-pointer hover:bg-cyan-700 rounded-xl"
            >
              <IoTrashBinSharp size={16} />
              <span>Delete</span>
            </div>
          )}
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Dropdown;
