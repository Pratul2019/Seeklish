"use client"
import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

interface DeleteModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
  isDeleting,
}) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeIn z-50">
      <div className="bg-header p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-[rgb(var(--foreground-rgb))] flex items-center">
            <FiAlertTriangle className="text-red-500 mr-2" size={22} />
            Confirm Delete
          </h2>
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <FiX size={20} />
          </button>
        </div>
        <p className="text-[rgb(var(--foreground-rgb))] mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          {/* <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button> */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <FaTrash className="mr-2" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;