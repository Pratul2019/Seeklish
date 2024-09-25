import DeleteModal from "@/Components/Comp_Indv/Deletemodal";
import axios from "axios";
import React, { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";

interface CommentdeleteProps {
  id: string;
  commentId: string;
  model: string;
  refreshComments: () => void;
}

export const Commentdelete: React.FC<CommentdeleteProps> = ({
  id,
  commentId,
  model,
  refreshComments,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Delete/commentdelete`, {
        postid: id,
        commentid: commentId,
        model,
      });

      if (response.status === 200) {
        setShowDeleteModal(false);
        refreshComments();
      } 
    } catch (error) {
      console.error(`Error deleting comment`);
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <div>
      <div
        className="mr-4 cursor-pointer"
        onClick={() => setShowDeleteModal(true)}
      >
        <IoTrashBinSharp size={16} className="hover:text-red-500"/>
      </div>

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