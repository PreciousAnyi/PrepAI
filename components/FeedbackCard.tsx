import React from "react";

interface FeedbackCardProps {
    score: string;
    verdict: string;
    type: string;
    role: string;
    date: string;
    time: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({score, verdict, type, role, date, time}) => {
  return (
    <div className="h-[192px] w-[831px] rounded-[16px] border bg-[#1A1A1A] ">
      <h2 className="text-center font-sora font-bold text-[#D6E0FF] pt-[32px] text-[24px]">
        Summary
      </h2>
      {/* first div */}
      <div>
        <div className="flex gap-[71px] justify-center pt-[22px]">
          <h4 className="font-redhat font-medium text-[24px] text-[#D6E0FF]">{`Total Score: ${score}`} </h4>
          <div className="flex gap-2 font-redhat font-medium text-[24px] text-[#D6E0FF]">
            <h4>Verdict:</h4>{" "}
            <div className="bg-[#D2B40F] px-2 rounded-full text-[#31343C] font-redhat">
              {verdict}
            </div>
          </div>
          <div className="font-redhat font-medium text-[24px] text-[#D6E0FF]">{`Type: ${type}`}</div>
        </div>
      </div>

      {/* second div */}
      <div>
        <div className="flex gap-[71px] justify-center pt-[22px]">
          <h4 className="font-redhat font-medium text-[24px] text-[#D6E0FF]">{`Role: ${role}`}</h4>
          <div className="flex gap-2 font-redhat font-medium text-[24px] text-[#D6E0FF]">
            <h4>{`Date: ${date}`}</h4>{" "}
            
          </div>
          <div className="font-redhat font-medium text-[24px] text-[#D6E0FF]">{`Time: ${time}`}</div>
        </div>
      </div>

      
    </div>
  );
};

export default FeedbackCard;
