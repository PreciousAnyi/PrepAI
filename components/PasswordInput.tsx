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
      >Password</label>
      <div className="group-focus-within:border-borders-action flex items-center rounded-xl h-[48px] md:h-[60px] border border-borders-disabled hover:border-borders-main-hifi">
        <div className="pl-[20px] text-text-disabled group-focus-within:text-active">
          <Lock />
        </div>
        <input
          type={passwordVisible ? "text" : "password"}
          id="passwordinput"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="focus:outline-none flex-1 px-3 py-2 border-none" // Input styles
        />
        <div
          className="pr-5 cursor-pointer text-text-disabled group-focus-within:text-active" // Eye icon container
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
