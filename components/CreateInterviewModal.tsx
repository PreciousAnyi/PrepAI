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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
    >
      <div className="flex flex-col items-center w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[1031px] bg-surface-card rounded-2xl relative py-10 px-6 sm:px-10">
        <h2 className="font-sora text-xl sm:text-2xl lg:text-[32px] font-semibold text-center">
          How would you like to create your interview?
        </h2>

        {/* Button container: stack on mobile, row on medium screens */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 sm:pt-14">
          <button
            onClick={() => onOptionSelect("ai")}
            className="min-w-[250px] w-[90%] md:min-w-[325px] sm:w-[250px] h-[250px] sm:h-[300px] lg:h-[330px] bg-[#4A154B] text-white rounded-xl font-redhat font-medium text-lg sm:text-xl lg:text-[28px] flex items-center justify-center"
          >
            AI-prompted
          </button>

          <span className="text-white text-lg font-redhat">OR</span>

          <button
            onClick={() => onOptionSelect("manual")}
            className="min-w-[250px] w-[90%] md:min-w-[325px] sm:w-[250px] h-[250px] sm:h-[300px] lg:h-[330px] bg-[#4A154B] text-white rounded-xl font-redhat font-medium text-lg sm:text-xl lg:text-[28px] flex items-center justify-center"
          >
            Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
