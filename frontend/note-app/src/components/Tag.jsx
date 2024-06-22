import React from "react";
import { PiHash } from "react-icons/pi";

const Tag = ({ tag }) => {
  return (
    <div className="flex gap-x-1 bg-blue-100 px-1 text-[11px] text-blue-950 hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
      <PiHash/>
      <span>{tag}</span>
    </div>
  );
};

export default Tag;
