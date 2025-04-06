import Image from "next/image";
import React from "react";

const Homepage = () => {
  return (
    <div className="px-[100px]">
      <div className="flex justify-between pl-[69px] pr-[80px] h-[299px] rounded-[16px] bg-[#121212]">
        <div className="w-[515px] pt-[70px]">
          <h2 className="font-sora text-[32px] font-bold text-[#ffffff]">
            Get Interview-Ready with AI- Powered Practice & Feedback
          </h2>
          <p className="font-redhat text-[#D6E0FF] text-[18px] pt-3">
            Practice real interview questions & get instant feedback.
          </p>
          
        </div>
        <Image src={"/bot.png"} alt="robot" width={290} height={290} />
      </div>

      <h2 className="font-sora text-[32px] font-bold text-[#ffffff] pt-[102px] pb-[20px]">
        Your Interviews
      </h2>
      <div className="h-[254px] rounded-[16px] bg-[#121212] "></div>

      <h2 className="font-sora text-[32px] font-bold text-[#ffffff] pt-[100px] pb-[44px]">
        Pick An Interview
      </h2>
    </div>
  );
};

export default Homepage;
