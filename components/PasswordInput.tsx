import React, { ChangeEvent, useState } from "react";
import { Lock, Eye, EyeOff } from "react-feather";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Enter password",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full group">
      <label
        htmlFor="passwordinput"
        className="text-body text-base font-medium font-redhat block mb-2"
      >
        Password
      </label>
      <div className="group-focus-within:border-borders-action flex items-center rounded-xl h-[48px] md:h-[60px] border border-borders-disabled hover:border-borders-main-hifi px-4 overflow-hidden">
        {/* Lock Icon */}
        <div className="text-text-disabled group-focus-within:text-active mr-2 flex-shrink-0">
          <Lock size={20} />
        </div>

        {/* Input Field */}
        <input
          type={passwordVisible ? "text" : "password"}
          id="passwordinput"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="focus:outline-none flex-grow min-w-0 text-sm bg-transparent"
        />

        {/* Eye Icon */}
        <div
          className="ml-2 cursor-pointer text-text-disabled group-focus-within:text-active flex-shrink-0"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
