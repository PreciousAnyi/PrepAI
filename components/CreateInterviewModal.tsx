import React from "react";

interface CreateInterviewModalProps {
  onClose: () => void;
  onOptionSelect: (type: "ai" | "manual") => void;
}

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  onClose,
  onOptionSelect,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-25 flex justify-center items-center "
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5) !important' }}
    >
      <div className="flex flex-col items-center w-[1031px] h-[600px] bg-surface-card rounded-[20px] relative">
        <div className="font-sora text-[32px] font-semibold pt-[87px]">
          How would you like to create your interview?
        </div>

        <div className="flex pt-[56px]">
          <button
            onClick={() => onOptionSelect("ai")}
            className="flex font-redhat font-medium cursor-pointer text-[28px] justify-center items-center w-[294px] h-[330px] bg-[#4A154B] rounded-[14px]"
          >
            AI-prompted
          </button>

          <div className="flex items-center px-[69px] font-redhat font-medium text-[28px]">
            Or
          </div>

          <button
            onClick={() => onOptionSelect("manual")}
            className="flex font-redhat font-medium cursor-pointer text-[28px] justify-center items-center w-[294px] h-[330px] bg-[#4A154B] rounded-[14px]"
          >
            Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
