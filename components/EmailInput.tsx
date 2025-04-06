import React, { ChangeEvent } from "react";
import { Mail } from "react-feather";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
      <div className="w-full group">
        <label
          htmlFor="emailinput"
          className="text-body text-base font-medium font-redhat block mb-2"
        >
          Email
        </label>
        <div
          className={`flex items-center border border-[#888888] rounded-xl hover:border-[#D5D0FF] group-focus-within:border-active h-[48px] md:h-[60px] overflow-hidden`}
        >
          <span className="pl-[20px] text-text-disabled group-focus-within:text-active">
            <Mail />
          </span>
  
          <input
            type="text"
            id="emailinput"
            name="email"
            placeholder="example@gmail.com"
            value={value}
            onChange={handleChange}
            className={`px-3 w-full focus:outline-none text-body `}
          />
        </div>
      </div>
    );
};

export default EmailInput;
