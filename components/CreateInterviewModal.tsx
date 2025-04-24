import React, { useState } from "react";

interface CreateInterviewModalProps {
  onClose: () => void;
  onOptionSelect: (type: "ai" | "manual") => void;
}

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  onClose,
  onOptionSelect,
}) => {
  const [selected, setSelected] = useState<"ai" | "manual" | null>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClick = (type: "ai" | "manual") => {
    if (!selected) {
      setSelected(type);
      onOptionSelect(type);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-6"
    >
      <div className="w-full max-w-[1031px] bg-surface-card rounded-[20px] p-6 sm:p-10 flex flex-col items-center text-center relative">
        <h2 className="font-sora text-2xl sm:text-3xl md:text-[32px] font-semibold pt-4 sm:pt-10 leading-snug">
          How would you like to create your interview?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-8 sm:pt-14 w-full">
          <button
            onClick={() => handleClick("ai")}
            disabled={!!selected}
            className={`flex justify-center items-center w-full max-w-[294px] h-[250px] sm:h-[330px] text-lg sm:text-2xl md:text-[28px] bg-[#4A154B] rounded-[14px] font-redhat font-medium text-white transition-opacity cursor-pointer ${
              selected ? "opacity-50" : ""
            }`}
          >
            AI-prompted
          </button>

          <div className="hidden sm:block font-redhat text-xl md:text-[28px]">
            Or
          </div>

          <button
            onClick={() => handleClick("manual")}
            disabled={!!selected}
            className={`flex justify-center items-center w-full max-w-[294px] h-[250px] sm:h-[330px] text-lg sm:text-2xl md:text-[28px] bg-[#4A154B] rounded-[14px] font-redhat font-medium text-white transition-opacity cursor-pointer ${
              selected ? "opacity-50" : ""
            }`}
          >
            Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
