import Image from "next/image";
import React from "react";
import InterviewBtn from "./InterviewBtn";

const InterviewCard = () => {
  return (
    <div className="flex flex-col w-full h-[448px] bg-surface-card rounded-[20px] overflow-hidden">
      <div className="flex justify-end">
        <div className="rounded-bl-[20px] w-[118px] h-[42px] bg-[#3A3A3A] flex items-center justify-center text-white">
          Technical
        </div>
      </div>

      <div className="px-[39px]">
        <Image src={"/icon.png"} alt="brand-logo" width={80} height={80} />
        <h2 className="py-[16px] font-sora font-semibold text-[28px] text-[#ffffff]">
          QA Engineer
        </h2>

        <div
          className={`flex justify-center items-center text-[12px] bg-[#3E8D2E6E] w-[80px] h-[22px] rounded-[4px] font-redhat font-normal`}
        >
          Junior
        </div>

        <div className="line-clamp-5 pt-[24px] font-redhat font-normal text-[14px]">
          This assessment focuses on your ability to detect issues, think
          critically about edge cases, and ensure quality across product
          experiences through methodical testing practices.
        </div>
        <div className="h-[26px]"></div>
      </div>
        <InterviewBtn text="Start Interview" />
    </div>
  );
};

export default InterviewCard;
