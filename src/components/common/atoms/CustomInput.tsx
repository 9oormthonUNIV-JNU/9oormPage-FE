import React, { forwardRef } from "react";

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder, value = "", type = "text", onChange }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2.5">
        {label && (
          <div className="ml-2.5">
            <span className="text-b3">{label}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="rounded-[20px] px-5 border border-[#E5E5E5] bg-[#F7F7F7] h-[64px] px-7.5 py-5 w-full text-b3 focus:outline-none focus:ring-1 focus:ring-[#9FBEF7] hover:shadow-[0px_0px_3px_3px_rgba(0,0,0,0.05)]"
        />
      </div>
    );
  }
);

export default CustomInput;
