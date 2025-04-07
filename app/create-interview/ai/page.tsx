"use client";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="px-[100px] pt-[72px]">
      <h2 className="font-sora text-[32px] font-bold text-[#ffffff]">PrepAI</h2>
      <h2 className="font-sora text-[32px] font-bold text-[#ffffff] pt-[59px] pb-[41px]">
        Create an Interview
      </h2>

      <div className="flex gap-5 pb-[32px]">
        <div className="flex justify-center items-center w-full h-[330px] bg-surface-card border-[#303030] rounded-2xl">
          <Image
            src={"/bot-head.png"}
            alt="bot-head"
            width={150}
            height={150}
          />
        </div>

        <div className="flex justify-center items-center w-full h-[330px] bg-surface-card border-[#303030] rounded-2xl">
          <Image
            src={"/profile.png"}
            alt="bot-head"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Caption */}
      <div className="flex px-[199px] font-redhat font-normal text-[24px] text-[#D6E0FF] justify-center items-center w-full h-[80px] bg-surface-card border-[#303030] rounded-2xl">
        The caption is what would be displayed here as the interview progress.
        Success!
      </div>

      {/* Leave Interview Button */}
      <div className="flex w-full justify-center pt-[32px]">
        <button
          type="button"
          onClick={() => {}}
          className="flex text-[#D6E0FF] cursor-pointer font-medium font-redhat text-[20px] items-center justify-center w-[190px] h-[67px] rounded-[100px] bg-[#EB5757]"
        >
          Leave Interview
        </button>
      </div>
    </div>
  );
};

export default page;
