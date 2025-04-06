import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number; // Total visible time (default: 3000ms)
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const exitTime = duration - 500; // Trigger exit 500ms before end

    const exitTimer = setTimeout(() => {
      setAnimateOut(true); // Trigger slide up
    }, exitTime);

    const removeTimer = setTimeout(() => {
      onClose(); // Fully remove after exit
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed z-50 left-[50vw] top-10 -translate-x-1/2 font-redhat px-[32px] py-3 bg-[#30D158] rounded-[8px] shadow-lg 
      transition-transform duration-500 ease-in-out
      ${animateOut ? "animate-toast-out" : "animate-toast-in"}`}
    >
      <p className="text-[#035417]">{message}</p>
    </div>
  );
};

export default Toast;
