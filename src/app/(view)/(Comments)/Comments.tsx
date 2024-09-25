"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LiaComments } from "react-icons/lia";
import Modal from "@/Components/Comp_Indv/Modal";
import axios from "axios";
import CommentModal from "./CommentsModal";

interface CommentsProps {
  id: string;
  model: string;
  comments: Comment[];
  user: string;
}

interface Comment {
  username: string;
  name: string;
  image: string;
  description: string;
  _id: string;
  createdAt: string;
}

const Comments: React.FC<CommentsProps> = ({ id, model, user }) => {
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [commentCount, setCommentCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const fetchCommentData = useCallback(async () => {
    if (!session?.user?.username) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/getComment`, {
        postid: id,
        model,
      });
      setCommentData(response.data.data?.[0]?.comment || []);
      setCommentCount(response.data.data?.[0]?.comment?.length || 0);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, model, session?.user?.username]);

  const handleCommentPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !session?.user?.username) return;
    setIsPosting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Comment`, {
        postid: id,
        description: comment,
        model,
        username: session.user.username,
      });
      if (response.status === 200) {
        setComment('');
        fetchCommentData();
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    if (session?.user?.username) {
      fetchCommentData();
    }
  }, [fetchCommentData, session?.user?.username]);

  const toggleModal = () => {
    if (session?.user) {
      setIsModalOpen((prev) => !prev);
    } else {
      setIsSignInModalOpen(true);
    }
  };
  const handleSignIn = () => {
    setIsLoading(true);
    // The actual redirection will be handled by the Link component
  };

  const refreshComments = () => {
    fetchCommentData();
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleModal}
            className="p-2 rounded-full transition-colors"
          >
            <LiaComments
              size={25}
              className={`transform transition-transform duration-300 ${
                isModalOpen ? " text-cyan-500" : "hover:text-cyan-500"
              }`}
            />
          </button>
          {commentCount > 0 && (
            <span className="text-xs font-thin">
              {commentCount === 1 ? "1 exp." : `${commentCount} exp's.`}
            </span>
          )}
        </div>
      </div>

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <Modal title="Let's get Started" setIsOpen={setIsSignInModalOpen}>
          <p className="mb-4 text-center">
          Can&apos;t comment without signing in!
          </p>
          <Link href="/signin" passHref>
            <button
              className={`bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-xl relative ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSignIn}
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

      {/* Comments Modal */}
      {session?.user && (
        <CommentModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          commentData={commentData}
          isLoading={isLoading}
          isPosting={isPosting}
          comment={comment}
          setComment={setComment}
          handleCommentPost={handleCommentPost}
          session={session}
          user={user}
          id={id}
          model={model}
          refreshComments={refreshComments}
        />
      )}
    </div>
  );
};

export default React.memo(Comments);
