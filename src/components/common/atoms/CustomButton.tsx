import React from "react";

type ButtonProps = {
  onClick?: () => void;
  cancel?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: React.FC<ButtonProps & { children: React.ReactNode }> = ({
  children,
  onClick,
  cancel = false,
  className = "",
  ...rest
}) => {
  const buttonBgColor = cancel ? "bg-white" : "bg-[#9fbef7]";
  const buttonBorderColor = cancel ? "border-[#9C9C9C]" : "border-[#8FABDE]";
  const hoverBorderColor = cancel
    ? "hover:border-[#9C9C9C]"
    : "hover:border-[#8FABDE]";

  return (
    <button
      onClick={onClick}
      className={`border ${buttonBorderColor}
                 h-[64px] 
                 text-center items-center
                 ${buttonBgColor} 
                 rounded-[20px] 
                 cursor-pointer
                 hover:outline-none 
                 focus:outline-none
                 ${hoverBorderColor} 
                 ${className}`}
      {...rest}
    >
      <span className="text-b3 text-[#000]">{children}</span>
    </button>
  );
};

export default CustomButton;
