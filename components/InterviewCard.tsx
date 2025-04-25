/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { useState } from "react";
import InterviewBtn from "./InterviewBtn";
import { useRouter } from "next/navigation";
import { getLevelBg, getTypeBg } from "@/lib/utils";


const InterviewCard = ({
  userId,
  id,
  role,
  type,
  techstack,
  level,
  brandLogoUrl, 
}: InterviewCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInterview = () => {
    setIsLoading(true);
    router.push(`/create-interview/${id}`);
  };

  return (
    <div className="flex flex-col w-full bg-surface-card rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] duration-300">
      {/* Top right tag */}
      <div className="flex justify-end">
        <div
          className={`rounded-bl-2xl px-4 py-2 ${getTypeBg(
            type
          )} text-white text-xs sm:text-sm md:text-base font-semibold`}
        >
          {type}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 sm:px-6 md:px-8 pb-6 flex flex-col flex-grow">
        <div className="flex justify-start">
          <div className="relative rounded-full overflow-hidden w-20 h-20 sm:w-16 sm:h-16">

            <Image
              src={brandLogoUrl || "/bot.png"} 
              alt="brand-logo"
              fill
            />
          </div>
        </div>

        <h2 className="py-4 font-sora font-semibold text-lg sm:text-xl md:text-2xl text-white leading-tight">
          {role}
        </h2>

        {/* Level Tag */}
        <div
          className={`inline-flex items-center justify-center text-xs font-redhat font-medium px-3 py-1 rounded-md ${getLevelBg(
            level ?? "unknown"
          )} w-fit mb-4`}
        >
          {level}
        </div>

        {/* Description */}
        <p className="line-clamp-5 font-redhat text-sm sm:text-base text-[#D6E0FF] mb-4">
          {`This assessment is a comprehensive ${type} interview tailored for a ${level} candidate. It is designed to evaluate core competencies and problem-solving skills. The candidate will be assessed across the following tech stacks: ${techstack.join(
            ", "
          )}.`}
        </p>

        {/* Start Interview Button */}
        <div className="mt-auto">
          <InterviewBtn
            text="Start Interview"
            loading={isLoading}
            onClick={handleStartInterview}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
