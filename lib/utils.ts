import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLevelBg = (level: string) => {
  switch (level.toLowerCase()) {
    case "junior":
      return "bg-[#3E8D2E6E]";
    case "mid-level":
      return "bg-[#8D892E6E]";
    case "senior":
      return "bg-[#8D2E2E6E]";
    default:
      return "bg-[#4e4e4e]"; // fallback
  }
};

export const getTypeBg = (type: string) => {
  switch (type.toLowerCase()) {
    case "non technical":
      return "bg-[#39444F]";
    case "non-technical":
      return "bg-[#39444F]";
    case "technical":
      return "bg-[#3A3A3A]";
  }
}

