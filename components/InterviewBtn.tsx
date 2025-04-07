import React, { ReactNode, MouseEvent } from "react";

interface InterviewBtnProps {
  text: string | ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const InterviewBtn: React.FC<InterviewBtnProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex text-text-primary text-[16px] cursor-pointer font-medium font-redhat items-center justify-center w-[190px] h-[40px] rounded-[56px] bg-[#4A154B]"
    >
      {text}
    </button>
  );
};

export default InterviewBtn;
