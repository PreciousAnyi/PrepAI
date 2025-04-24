"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { cn, getLevelBg, getTypeBg } from "@/lib/utils";

const Agent = ({
  userName,
  userId,
  interviewId,
  interviewType,
  interviewLevel,
  interviewRole,
  feedbackId,
  type,
  questions,
  profileImageUrl,
}: AgentProps) => {
  enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
  }

  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          { role: message.role, content: message.transcript },
        ]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0)
      setLastMessage(messages[messages.length - 1].content);

    const handleGenerateFeedback = async () => {
      if (!interviewId) return console.error("interviewId is required.");
      const { success, feedbackId: id } = await createFeedback({
        interviewId,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      router.push(
        success && id ? `/create-interview/${interviewId}/feedback` : "/"
      );
    };

    if (callStatus === CallStatus.FINISHED) {
      type === "generate" ? router.push("/") : handleGenerateFeedback();
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: { username: userName, userid: userId },
      });
    } else {
      const formattedQuestions =
        questions?.map((q) => `- ${q}`).join("\n") || "";
      await vapi.start(interviewer, {
        variableValues: { questions: formattedQuestions },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
  }

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-24 xl:px-[100px] pt-16 md:pt-[72px]">
      <h2
        className="text-2xl md:text-3xl font-sora font-bold text-white cursor-pointer"
        onClick={() => router.push("/")}
      >
        PrepAI
      </h2>

      <h2 className="font-sora text-2xl md:text-3xl font-bold text-white pt-10 pb-10">
        {type === "generate" ? (
          "Create an Interview"
        ) : (
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative h-10 w-10">
                <Image
                  src={profileImageUrl}
                  alt="profile"
                  fill
                  className="rounded-full object-cover hidden md:block"
                />
              </div>
              <span>{interviewRole}</span>
              <h3 className="font-sora text-xl md:text-2xl font-bold text-white">
                Interview
              </h3>
              <div
                className={`text-xs ${getLevelBg(
                  interviewLevel ?? "unknown"
                )} w-fit h-6 rounded font-redhat px-3 py-1 flex items-center justify-center hidden sm:block`}
              >
                {interviewLevel}
              </div>
            </div>
            <div
              className={`rounded-bl-2xl ${getTypeBg(
                interviewType ?? ""
              )} flex items-center justify-center font-redhat font-medium text-base w-[118px] rounded-tr-2xl`}
            >
              {interviewType}
            </div>
          </div>
        )}
      </h2>

      <div className="flex flex-col md:flex-row gap-5 pb-8">
        {/* AI card - always shown */}
        <div className="flex justify-center items-center w-full h-[330px] bg-surface-card border border-[#303030] rounded-2xl relative">
          <div className="relative rounded-full w-[150px] h-[150px] overflow-hidden">
            <Image
              src="/bot-head.png"
              alt="bot-head"
              fill
              className="object-cover"
            />
          </div>
          {isSpeaking && (
            <span className="absolute inline-flex w-24 h-24 animate-ping rounded-full bg-primary-200 opacity-75"></span>
          )}
        </div>

        {/* User profile card - hidden on mobile */}
        <div className="hidden md:flex justify-center items-center w-full bg-surface-card border border-[#303030] rounded-2xl">
          <div className="relative rounded-full w-[150px] h-[150px] overflow-hidden">
            <Image
              src={profileImageUrl}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex px-3 md:px-10 lg:px-48 font-redhat font-normal text-base md:text-xl text-[#D6E0FF] justify-center items-center w-full h-20 bg-surface-card border border-[#303030] rounded-2xl">
        <p
          key={lastMessage}
          className={cn(
            "transition-opacity duration-500 opacity-0",
            "animate-fadeIn opacity-100"
          )}
        >
          {lastMessage}
        </p>
      </div>

      <div className="flex w-full justify-center pt-8">
        <button
          type="button"
          disabled={callStatus === "CONNECTING"}
          onClick={
            callStatus === "ACTIVE"
              ? handleDisconnect
              : callStatus === "INACTIVE"
              ? handleCall
              : undefined
          }
          className={`text-white cursor-pointer font-medium text-lg px-8 py-4 rounded-full transition-colors duration-300 ${
            callStatus === "ACTIVE"
              ? "bg-[#EB5757]"
              : callStatus === "CONNECTING"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500"
          }`}
        >
          {callStatus === "CONNECTING"
            ? "Connecting..."
            : callStatus === "ACTIVE"
            ? "Leave Interview"
            : "Begin Interview"}
        </button>
      </div>
    </div>
  );
};

export default Agent;
