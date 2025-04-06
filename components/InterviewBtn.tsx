import React, { ReactNode, MouseEvent, } from "react";

interface InterviewBtnProps {
  text: string | ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  fill?: boolean;
}

const InterviewBtn: React.FC<InterviewBtnProps> = ({}) => {
  return <div>
    <button>

    </button>
  </div>;
};

export default InterviewBtn;
