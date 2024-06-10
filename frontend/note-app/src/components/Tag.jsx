import React from "react";
import { IoClose } from "react-icons/io5";

const Tag = ({ tag, index, tags, setTags }) => {
  return (
    <div className="flex items-center gap-x-2 text-sm bg-gray-200 w-fit px-2 py-1">
      <p>{tag}</p>
      <IoClose
        onClick={() => {
          let newTags = [];
          for (let i = 0; i < tags.length; i++) {
            if (i !== index) {
              newTags = [...newTags, tags[i]];
            }
          }
          setTags(newTags);
        }}
        className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-100"
      />
    </div>
  );
};

export default Tag;
