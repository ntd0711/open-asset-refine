import React from "react";

type Props = {};

const LeftSide = (props: Props) => {
  return (
    <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-[36px] w-[50%] bg-[#F7F7F7]">
      <h2 className="text-[28px] leading-[42px]">Logo</h2>
      <h2 className="text-[32px] leading-[38.73px]">Open Threads</h2>
    </div>
  );
};

export default LeftSide;
