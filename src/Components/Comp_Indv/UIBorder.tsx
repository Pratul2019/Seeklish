import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";

const UIBorder = () => {
  return (
    <div className="p-4 rounded-xl min-w-48 max-w-52 border flex flex-col gap-4 items-center border-teal-700">
      <div className="border min-w-36 max-w-52"></div>
      <div className="flex">
        <div className="border w-28 h-28 grid  rounded-l-xl">
        <div className="flex justify-end"><CiSquarePlus size={25}/></div>
        <FaCircleUser size={25} />
        </div>
        <div className="border w-10 h-28 grid items-end rounded-r-xl"><FaCircleUser size={25} /></div>
      </div>
    </div>
  );
};

export default UIBorder;


