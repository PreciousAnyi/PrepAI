import React, { ChangeEvent, ReactNode } from "react";

interface TextInputProps {
  label?: string;
  value: string;
  icon?: ReactNode;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: "text" | "number"; // Type can be either "text" or "number"
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  icon,
  placeholder,
  onChange,
  type = "text", // Default to "text"
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // If type is number, ensure only numeric input
    if (type === "number" && /^[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    } else if (type === "text") {
      onChange(inputValue);
    }
  };

  return (
    <div className="w-full group">
      <label
        htmlFor="textinput"
        className="text-body text-base font-medium font-redhat block mb-2"
      >
        {label ? label : "Input"}
      </label>
      <div
        className={`flex items-center border border-surface-disabled rounded-xl hover:border-borders-action-hover group-focus-within:border-borders-action h-[48px] md:h-[60px] overflow-hidden`}
      >
        {icon && (
          <span className="pl-[20px] text-text-disabled group-focus-within:text-active">
            {icon}
          </span>
        )}
        <input
          type={type} // Use the provided type (either "text" or "number")
          id="textinput"
          name="textinput"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="px-3 w-full focus:outline-none text-body"
          // Disable number input spinner (this works for most modern browsers)
          inputMode={type === "number" ? "numeric" : "text"}
          pattern={type === "number" ? "[0-9]*" : undefined}
          // Disable spinner in Chrome, Firefox, Safari, etc.
          style={{
            WebkitAppearance: "none", // For Safari/Chrome
            MozAppearance: "textfield", // For Firefox
            fontSize: "16px", // Set a default font size
            paddingRight: "10px", // Adjust padding if needed
          }}
        />
      </div>
    </div>
  );
};

export default TextInput;
