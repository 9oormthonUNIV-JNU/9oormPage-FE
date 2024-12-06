import React, { forwardRef } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2.5">
        {label && (
          <div className="ml-2.5">
            <span className="text-b3">{label}</span>
          </div>
        )}
        <input
          ref={ref}
          {...props} // 이 부분에서 input의 모든 속성들을 전파합니다.
          className="rounded-[20px] px-5 border border-[#E5E5E5] bg-[#F7F7F7] h-[64px] px-7.5 py-5 w-full text-b3 focus:outline-none focus:ring-1 focus:ring-[#9FBEF7] hover:shadow-[0px_0px_3px_3px_rgba(0,0,0,0.05)]"
        />
      </div>
    );
  }
);

export default CustomInput;
