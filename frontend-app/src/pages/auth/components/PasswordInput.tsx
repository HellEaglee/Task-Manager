import React, { useState } from "react";
import { passwordHide_icon, passwordShow_icon } from "../../../assets";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="relative">
      <input
        className="w-[21.25rem] h-10 font-normal text-sm text-graysilver placeholder:text-graysilver px-[0.625rem] bg-transparent border-graysilver border-2 rounded-lg"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <button
        type="button"
        className="absolute right-2 top-2"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <img src={passwordHide_icon} alt="Hide password" className="size-6" />
        ) : (
          <img src={passwordShow_icon} alt="Show password" className="size-6" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
