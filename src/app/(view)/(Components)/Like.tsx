import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsFire } from "react-icons/bs";
import Modal from "@/Components/Comp_Indv/Modal";
import Link from "next/link";
import axios from "axios";

interface LikeProps {
  id: string;
  likes: string[];
  model: string;
}

const Like: React.FC<LikeProps> = ({ id, likes, model }) => {
  const { data: session } = useSession();
  const [likeData, setLikeData] = useState<string[]>(likes || []);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLikePost = async () => {
   
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Like`, {
        postid: id,
        model,
        headers: {
          Authorization: `Bearer ${session?.sessionToken}`,
        },
      });
      setLikeData(res.data.data);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const getLikeInfo = () => {
  //   if (likeData.length > 49) return "50+ likes (Blue)";
  //   if (likeData.length > 19) return "20-49 likes (Red)";
  //   if (likeData.length > 0) return "1-19 likes (Yellow)";
  //   return "No likes (Gray)";
  // };

  const handleLike = () => {
    if (session?.user?.username) {
      handleLikePost();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-1 cursor-pointer mt-1">
          {/* <IoInformationCircle
            size={15}
            className="ml-2 cursor-pointer"
            onClick={() => setIsInfoOpen(true)}
          /> */}
          <div onClick={handleLike}>
            <BsFire
              size={28}
              className={
                likeData.length > 49
                  ? "text-blue-700"
                  : likeData.length > 19
                  ? "text-red-700"
                  : likeData.length > 0
                  ? "text-yellow-700"
                  : "text-gray-400"
              }
            />
          </div>
          <div className="flex">
            <span className="text-xs font-thin">
              {likeData.length === 1 ? "1" : likeData.length}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal title="Let's Get Started" setIsOpen={setIsOpen}>
          <p className="mb-4 text-center">
          Can&apos;t comment without signing in!
          </p>
          <Link href="/signin" passHref>
            <button
              className={`bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-xl relative ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setIsLoading(true)} // Set loading state on click
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Sign In / Register</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                </>
              ) : (
                "Sign In / Register"
              )}
            </button>
          </Link>
        </Modal>
      )}

      {/* {isInfoOpen && (
        <Modal title="Like Information" setIsOpen={setIsInfoOpen}>
          <p>Like Status: {getLikeInfo()}</p>
          <p>This icon indicates the number of likes:</p>
          <ul>
            <li>Blue: 50+ likes</li>
            <li>Red: 20-49 likes</li>
            <li>Yellow: 1-19 likes</li>
            <li>Gray: No likes</li>
          </ul>
        </Modal>
      )} */}
    </>
  );
};

export default Like;
