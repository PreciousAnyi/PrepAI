/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React from "react";
import InterviewBtn from "./InterviewBtn";

const InterviewCard = ({
  //
  userId,
  role,
  type,
  techstack,
  level,
}: InterviewCardProps) => {
  return (
    <div className="flex flex-col w-full h-[448px] bg-surface-card rounded-[20px] overflow-hidden">
      <div className="flex justify-end">
        <div className="rounded-bl-[20px] w-[118px] h-[42px] bg-[#3A3A3A] flex items-center justify-center text-white">
          {type}
        </div>
      </div>

      <div className="px-[39px]">
        <Image src={"/brand.png"} alt="brand-logo" width={80} height={80} />
        <h2 className="py-[16px] font-sora font-semibold text-[28px] text-[#ffffff]">
          {role}
        </h2>

        <div
          className={`flex justify-center items-center text-[12px] bg-[#3E8D2E6E] w-[80px] h-[22px] rounded-[4px] font-redhat font-normal`}
        >
          {level}
        </div>

        <div className="line-clamp-5 pt-[24px] font-redhat font-normal text-[14px]">
          {`This assessment is a comprehensive ${type} interview tailored for a ${level} candidate.
It is designed to evaluate core competencies and problem-solving skills.
The candidate will be assessed across the following tech stacks: ${techstack.join(
            ", "
          )}.`}
        </div>
        <div className="h-[26px]"></div>
        <InterviewBtn text="Start Interview" />
      </div>
    </div>
  );
};

export default InterviewCard;
