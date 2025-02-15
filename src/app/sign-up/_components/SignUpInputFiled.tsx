import React from "react";

interface SignUpInputFiledProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  validationMessage?: string;
  isValid: boolean;
  regex?: RegExp;
}

const SignUpInputFiled: React.FC<SignUpInputFiledProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
  validationMessage,
  isValid,
  regex,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm md:text-xs sm:text-xs font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-bg-[#2aa7be] text-sm md:text-xs sm:text-xs"
      />
      {validationMessage && (
        <p
          className={`mt-2 text-sm md:text-xs sm:text-xs ${
            isValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default SignUpInputFiled;
