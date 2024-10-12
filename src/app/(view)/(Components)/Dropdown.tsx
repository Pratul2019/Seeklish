import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import DeleteModal from "@/Components/Comp_Indv/Deletemodal";
import Share from "@/Components/Comp_Indv/Share";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [handleOutsideClick]);

  const handleDelete = useCallback(async () => {
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
  }, [isDeleting, postid, model]);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const openDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex gap-2 hover:text-teal-500"
        onClick={toggleDropdown}
        aria-expanded={showDropdown}
        aria-label="Toggle Dropdown"
      >
        <IoIosArrowDropdown size={20} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 border border-teal-700 p-2 bg-header w-max text-xs rounded-xl z-50">
          <div className="flex gap-2 px-4 py-2 items-center cursor-pointer hover:bg-teal-700 rounded-xl">
            <Share postUrl={postUrl} />
          </div>
          {isCurrentUser && (
            <div
              onClick={openDeleteModal}
              className="flex gap-2 px-4 py-2 cursor-pointer hover:bg-teal-700 rounded-xl"
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

export default React.memo(Dropdown);