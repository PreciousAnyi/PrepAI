'use client'
import FeedbackCard from "@/components/FeedbackCard";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <h3
        className="font-sora cursor-pointer text-white font-bold text-[32px] pt-[72px] pl-[100px]"
        onClick={() => router.push("/")}
      >
        PrepAI
      </h3>

      <h3 className="font-sora font-bold text-center text-[48px] pt-[71px]">{`Interview Feedback - ${`Product Designer`}`}</h3>

      <div className="border mt-[26px]"></div>
      <div className="h-[52px]"></div>

      <div className="flex justify-center ">
        <FeedbackCard
          score="76/100"
          verdict="Promising"
          type="Technical"
          role="Product Designer"
          date="Apr 10th, 2025."
          time="9:00AM"
        />
      </div>
    </div>
  );
};

export default page;
