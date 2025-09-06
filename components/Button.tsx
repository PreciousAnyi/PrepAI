import React, { MouseEvent, ReactNode } from "react";


interface ButtonProps {
  text: string | ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  width?: string;
  height?: string;
  fill?: boolean;
  type?: "button" | "submit" | "reset",
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  onClick,
  loading,
  width,
  height,
  fill,
  type = "submit",
}) => {
  return (
    <button
    type={type}
      className={`${
        fill
          ? "bg-[#4A154B] text-text-secondary"
          : "border bg-[#222222] text-surface-action"
      } 
      font-redhat cursor-pointer font-medium rounded-xl flex items-center justify-center 
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ width: width || "100%", height: height || "48px" }}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default Button;
