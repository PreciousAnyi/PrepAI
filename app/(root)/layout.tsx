// import { InterviewContext } from "@/context/interviewContext";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");
  const user = await getCurrentUser();
  const userInterviews = await getInterviewsByUserId(user?.id ?? "");
  console.log("UserContext value:", user);
  console.log("InterviewContext value:", userInterviews);

  return (
        <div className="min-h-screen bg-background">
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background flex items-center justify-between px-6 md:px-[100px] py-4 border-[#333]">
            <h4 className="font-sora text-2xl md:text-[32px] font-bold text-white">
              PrepAI
            </h4>
            <Image
              src={user?.profileImageUrl ?? "/profile.png"}
              alt="Profile picture"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          </div>

          {/* Page content */}
          <main className="py-6">{children}</main>
        </div>
  );
};

export default RootLayout;
