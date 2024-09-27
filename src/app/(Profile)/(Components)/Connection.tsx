"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import axios from "axios";
import Link from "next/link";

interface Connection {
  username: string;
  name: string;
  image: string;
  isallowed: boolean;
}

interface ConnectionsModalProps {
  connections: Connection[];
  onClose: () => void;
  currentuser: string;
  profileUser: string;
}

const ConnectionsModal: React.FC<ConnectionsModalProps> = ({
  connections,
  onClose,
  currentuser,
  profileUser,
}) => {
  const [checkedUsernames, setCheckedUsernames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  useEffect(() => {
    const allowedUsernames = connections
      .filter((connection) => connection.isallowed)
      .map((connection) => connection.username);
    setCheckedUsernames(allowedUsernames);
  }, [connections]);

  const handleCheckboxChange = (username: string, isChecked: boolean) => {
    setCheckedUsernames((prev) =>
      isChecked ? [...prev, username] : prev.filter((uname) => uname !== username)
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const updatedConnections = connections.map((connection) => ({
        ...connection,
        isallowed: checkedUsernames.includes(connection.username),
      }));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/isAllowed`,
        {
          profileUser,
          checkedUsernames,
          updatedConnections,
        }
      );

      if (response.status === 200 && response.data.success) {
        

        
        onClose(); // Close modal on success if needed
      } else {
        console.error("Error updating connections:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating connections:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-header p-6 rounded-3xl max-w-sm w-full relative flex flex-col max-h-80 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="p-2">Connections</h2>
          <IoIosClose
            size={30}
            onClick={onClose}
            className="cursor-pointer hover:text-red-500"
          />
        </div>

        <ul>
          {connections.map((connection, index) => (
            <li key={index} className="flex justify-between items-center p-2 gap-20">
              <div className="flex items-center">
              <Link href={connection.username}>
                <Image
                  src={connection.image}
                  alt={connection.name}
                  className="w-10 h-10 rounded-full mr-2"
                  height={40}
                  width={40}
                  priority
                />
                </Link>
                <label>{connection.name}</label>
              </div>
              {profileUser === currentuser && (
                checkedUsernames.includes(connection.username) ? (
                  <PiToggleRightFill
                    size={30}
                    fill="teal"
                    onClick={() => handleCheckboxChange(connection.username, false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <PiToggleLeftFill
                    size={30}
                    onClick={() => handleCheckboxChange(connection.username, true)}
                    className="cursor-pointer"
                  />
                )
              )}
            </li>
          ))}
        </ul>
        {profileUser === currentuser && (
          <div className="self-center mt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-header hover:text-teal-700 p-3 rounded-full"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsModal;
