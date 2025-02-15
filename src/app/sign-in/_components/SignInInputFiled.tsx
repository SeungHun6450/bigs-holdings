import React from "react";

interface SignInInputFiledProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const SignInInputFiled: React.FC<SignInInputFiledProps> = ({
  label,
  type,
  value,
  onChange,
  required,
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
    </div>
  );
};

export default SignInInputFiled;
