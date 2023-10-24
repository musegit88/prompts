import React from "react";

const ChevronDown = () => {
  return (
    <div className="max-[640px]:hidden absolute bottom-[10px] translate-x-[-50%] animate-bounce">
      <svg width="30px" height="20px">
        <path
          stroke="#ffffff"
          fill="none"
          stroke-width="2px"
          d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
        ></path>
      </svg>
    </div>
  );
};

export default ChevronDown;