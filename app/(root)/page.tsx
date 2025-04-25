/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CreateInterviewModal from "@/components/CreateInterviewModal";
import InterviewBtn from "@/components/InterviewBtn";
import InterviewCard from "@/components/InterviewCard";
import ManualInterviewModal from "@/components/ManualInterviewModal";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"initial" | "manual">("initial");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<Interview[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      const interviews = await getInterviewsByUserId(currentUser?.id ?? "");
      setUserInterviews(interviews ?? []);
    };

    fetchData();
  }, []);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;

  const handleOptionClick = (type: "ai" | "manual") => {
    if (type === "manual") {
      setModalType("manual");
    } else {
      router.push(`/create-interview/ai`);
    }
  };

  const handleCreateInterviewClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsLoading(false);
    }, 1000); 
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[100px] py-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-6 sm:p-10 lg:px-12 lg:py-16 bg-[#1A1A1A] rounded-2xl">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold text-white">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="font-redhat text-[#D6E0FF] text-base sm:text-lg mt-3 mb-6">
            Practice real interview questions & get instant feedback.
          </p>
          <div className="flex justify-center lg:justify-start">
            <InterviewBtn
              text={isLoading ? "Loading..." : "Create an Interview"}
              onClick={handleCreateInterviewClick}
              loading={isLoading}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          <Image
            src="/bot.png"
            alt="robot"
            width={290}
            height={290}
            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[290px] lg:h-[290px]"
          />
        </div>
      </div>

      {/* Your Interviews */}
      <h2 className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold text-white mt-20 mb-6">
        Your Interviews
      </h2>

      {hasPastInterviews ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              id={interview.id}
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
        <div className="flex flex-col items-center justify-center bg-surface-card h-[200px] sm:h-[254px] rounded-2xl text-center">
          <h4 className="font-redhat text-[#D6E0FF] text-lg sm:text-xl mb-6">
            Interviews you create will show up here.
          </h4>
          <InterviewBtn
            text={isLoading ? "Loading..." : "Create an Interview"}
            onClick={handleCreateInterviewClick}
            loading={isLoading}
          />
        </div>
      )}

      {/* Pick an Interview */}
      <h2 className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold text-white mt-20 mb-10">
        Pick An Interview
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* You can populate this section as needed */}
      </div>

      {isModalOpen && modalType === "initial" && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
          <CreateInterviewModal
            onClose={() => setIsModalOpen(false)}
            onOptionSelect={handleOptionClick}
          />
        </div>
      )}

      {isModalOpen && modalType === "manual" && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
        <ManualInterviewModal
          onClose={() => {
            setModalType("initial");
            setIsModalOpen(false);
          }}
          onSubmit={(data) => {
            console.log("Manual interview data:", data);
            // You can send this to an API, then close modal
            setIsModalOpen(false);
            setModalType("initial");
          }}
        />
        </div>
      )}
    </div>
  );
};

export default Homepage;
