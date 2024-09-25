"use client"

import React from 'react';
import { SiNamecheap } from 'react-icons/si';
import { MdDescription } from 'react-icons/md';

interface PostDetailsProps {
  postName: string;
  setPostName: (name: string) => void;
  caption: string;
  setCaption: (caption: string) => void;
}

const PostDetails = ({
  postName,
  setPostName,
  caption,
  setCaption
}: PostDetailsProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2">
        <SiNamecheap size={25} className="text-gray-500 flex-shrink-0" />
        <input
          type="text"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          placeholder="Name (max 35 char)"
          className="w-full p-2 rounded-3xl bg-transparent"
          maxLength={35}
        />
      </div>
      <div className="flex items-start space-x-2">
        <MdDescription size={25} className="text-gray-500 mt-2 flex-shrink-0" />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Uniqueness?"
          className="w-full p-2 rounded-3xl h-24 bg-transparent resize-none"
        />
      </div>
    </div>  
  );
};

export default PostDetails;