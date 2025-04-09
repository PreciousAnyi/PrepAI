"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { cn } from "@/lib/utils";

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  profileImageUrl
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
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

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
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
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
            className="rounded-full object-cover"
          />
          {isSpeaking && (
            <span className="absolute inline-flex w-[100px] h-[100px] animate-ping rounded-full bg-primary-200 opacity-75"></span>
          )}
        </div>

        <div className="flex justify-center items-center w-full h-[330px] bg-surface-card border-[#303030] rounded-2xl">
          <Image
            src={profileImageUrl}
            alt="bot-head"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* Caption */}
      <div className="flex line-clamp-2 px-[12px] md:px-[199px] font-redhat font-normal text-[16px] md:text-[24px] text-[#D6E0FF] justify-center items-center w-full h-[80px] bg-surface-card border-[#303030] rounded-2xl">
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

      {/* Leave Interview Button */}
      <div className="flex w-full justify-center pt-[32px]">
        <button
          type="button"
          onClick={callStatus !== "ACTIVE" ? handleCall : handleDisconnect}
          className={`flex text-[#D6E0FF] cursor-pointer font-medium font-redhat text-[20px] items-center justify-center w-[190px] h-[67px] rounded-[100px] ${callStatus !== "ACTIVE" ? 'bg-green-500' : 'bg-[#EB5757]'}`}
        >
         {callStatus !== "ACTIVE" ? "Begin Interview" : "Leave Interview"}
        </button>
      </div>
    </div>
  );
};

export default Agent;
