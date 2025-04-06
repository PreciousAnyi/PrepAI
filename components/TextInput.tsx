import React, { ChangeEvent, ReactNode } from "react";
interface TextInputProps {
  label?: string;
  value: string;
  icon?: ReactNode;
  placeholder?: string;
  onChange: (value: string) => void;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  icon,
  placeholder,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className='w-full group'>
      <label
        htmlFor='textinput'
        className='text-body text-base font-medium font-redhat block mb-2'>
        {label ? label : "First Name"}
      </label>
      <div
        className={`flex items-center  border border-surface-disabled rounded-xl hover:border-borders-action-hover group-focus-within:border-borders-action h-[48px] md:h-[60px] overflow-hidden`}
      >
      {icon && (
          <span className="pl-[20px] text-text-disabled group-focus-within:text-active">
            {icon}
          </span>
        )}
        <input
          type="text"
          id="textinput"
          name="textinput"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`px-3 w-full focus:outline-none text-body `}
        />
      </div>
    </div>
  );
};
export default TextInput;