import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import Image from "next/image";
import { BsSendArrowUp } from "react-icons/bs";
import Modal from "@/Components/Comp_Indv/Modal";
import Commentloading from "../loading";
import { Session } from "next-auth";
import { Commentdelete } from "./CommentsDelete";

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  commentData: Comment[];
  isLoading: boolean;
  isPosting: boolean;
  comment: string;
  setComment: (comment: string) => void;
  handleCommentPost: (e: React.FormEvent) => Promise<void>;
  session: Session;
  user: string;
  id: string;
  model: string;
  refreshComments: () => void; // New prop
}

interface Comment {
  username: string;
  name: string;
  image: string;
  description: string;
  _id: string;
  createdAt: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  setIsOpen,
  commentData,
  isLoading,
  isPosting,
  comment,
  setComment,
  handleCommentPost,
  session,
  user,
  id,
  model,
  refreshComments,
}) => {
  if (!isOpen) return null;

  // Sort the comments by createdAt in descending order (latest first)
  const sortedComments = [...commentData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Modal title="Experiences" setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2">
          <textarea
            className="flex border-b border-teal-700 text-center  bg-transparent w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share.."
           
            disabled={isPosting}
          />
          <button
            type="submit"
            disabled={!comment.trim() || isPosting}
            onClick={handleCommentPost}
            className="p-2 rounded-full transition-colors"
          >
            <BsSendArrowUp
              size={18}
              className="hover:text-teal-500 cursor-pointer"
            />
          </button>
        </div>

        {/* Comments List */}
        <div className="overflow-y-auto max-h-screen max-w-full ">
          {isLoading ? (
            <Commentloading />
          ) : sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <div key={comment._id} className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                  <Link href={`/${comment.username}`}>
                    <Image
                      className="h-9 w-9 rounded-full"
                      src={comment.image}
                      alt=""
                      height={100}
                      width={100}
                      priority={true}
                    />
                  </Link>

                  <div className="flex-grow text-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-light">{comment.name}</span>
                      <Moment
                        className="text-xs font-extralight text-gray-500"
                        fromNow
                      >
                        {new Date(comment.createdAt)}
                      </Moment>
                    </div>
                    <div className="break-words text-start max-w-60 max-h-30 ">
                      {comment.description}
                    </div>
                  </div>
                </div>
                {(session?.user.username === user ||
                  session?.user.username === comment.username) && (
                  <Commentdelete
                    id={id}
                    commentId={comment._id}
                    model={model}
                    refreshComments={refreshComments}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center my-4 italic text-gray-500">
              No shared experiences
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
