/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CreateInterviewModal from "@/components/CreateInterviewModal";
import InterviewBtn from "@/components/InterviewBtn";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<Interview[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        const interviews = await getInterviewsByUserId(currentUser?.id ?? "");
        setUserInterviews(interviews ?? []);
      }

    fetchData();
  }, []); 

  // if (!user || userInterviews === null){
  //   return <div>Loading...</div>; // Loading state until user data is fetched
  // }

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;

  const handleOptionClick = (type: "ai" | "manual") => {
    if (type === "ai") {
      router.push("/create-interview/ai");
    } else {
      router.push("/create-interview/manual");
    }
  };
  return (
    <div className="px-[100px]">
      <div className="flex justify-between pl-[69px] pr-[80px] h-[299px] rounded-[16px] bg-[#1A1A1A]">
        <div className="w-[515px] pt-[70px]">
          {/* left div */}
          <h2 className="font-sora text-[32px] font-bold text-[#ffffff]">
            Get Interview-Ready with AI- Powered Practice & Feedback
          </h2>
          <p className="font-redhat text-[#D6E0FF] text-[18px] pt-3 pb-[24px]">
            Practice real interview questions & get instant feedback.
          </p>
          <InterviewBtn
            text="Create an Interview"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <Image src={"/bot.png"} alt="robot" width={290} height={290} />
      </div>

      {/* Interview Card */}
      <h2 className="font-sora text-[32px] font-bold text-[#ffffff] pt-[102px] pb-[20px]">
        Your Interviews
      </h2>

      {hasPastInterviews ? (
        <div className="grid grid-cols-3 gap-5">
          {userInterviews?.map((interview) => (
            <InterviewCard
              key={interview.id}
              userId={user?.id ?? ""}
              level={interview.level}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[254px] rounded-[16px] bg-surface-card ">
          <h4 className="pb-[41px] font-redhat font-normal text-[#D6E0FF] text-[24px]">
            {" "}
            Interviews you create will show up here.{" "}
          </h4>
          <InterviewBtn
            text="Create an Interview"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      <h2 className="font-sora text-[32px] font-bold text-[#ffffff] pt-[100px] pb-[44px]">
        Pick An Interview
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {/* <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
        <InterviewCard /> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateInterviewModal
            onClose={() => setIsModalOpen(false)}
            onOptionSelect={handleOptionClick}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
