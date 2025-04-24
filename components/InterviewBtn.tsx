import React, { ReactNode, MouseEvent } from "react";

interface InterviewBtnProps {
  text: string | ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}

const InterviewBtn: React.FC<InterviewBtnProps> = ({ text, onClick, loading }) => {
  return (
    <button
      type="button"
      onClick={!loading ? onClick : undefined}
      disabled={loading}
      className={`flex items-center justify-center font-redhat text-[14px] sm:text-[16px] font-medium rounded-[56px] bg-[#4A154B] text-text-primary
        h-[40px] w-[150px] sm:w-[190px] cursor-pointer transition-opacity duration-300
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
      `}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default InterviewBtn;
