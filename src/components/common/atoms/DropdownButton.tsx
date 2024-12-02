import React, { useState, useRef, useEffect } from "react";
import icon_down from "../../../../public/icons/icon_down.svg";

type Option = {
  label: string;
  value: string;
};

type DropdownButtonProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (selected: string) => void;
  buttonHeight?: number; // 버튼의 높이 (단위: px)
  dropdownHeight?: number; // 드롭다운 메뉴의 높이 (단위: px)
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  options,
  value = "",
  onChange,
  buttonHeight = 64, // 기본 버튼 높이 (단위: px)
  dropdownHeight = 192, // 기본 드롭다운 메뉴 높이 (단위: px)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col w-full relative">
      {label && <div className="ml-2.5 mb-2 text-b3">{label}</div>}
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center text-b3 rounded-[20px] px-5 border border-[#E5E5E5] bg-[#F7F7F7] focus:outline-none focus:ring-1 focus:ring-[#9FBEF7] hover:shadow-[0px_0px_3px_3px_rgba(0,0,0,0.05)]`}
        style={{ height: `${buttonHeight}px` }} // 버튼의 높이 적용 (단위: px)
      >
        <span className="text-gray-500">
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption)?.label ||
              label
            : label || "Select"}
        </span>
        <img src={icon_down} alt="dropdown icon" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-[#F7F7F7] top-[calc(100%+10px)] border rounded-[10px] p-3 w-full z-10"
        >
          {options.map((option) => (
            <div
              key={option.value}
              style={{
                maxHeight: `${dropdownHeight}px`,
              }}
              onClick={() => handleOptionClick(option.value)}
              className="flex items-center h-16 px-6 py-4 cursor-pointer bg-[#F7F7F7] rounded-[10px] z-10 p-3 hover:bg-[#D8D8D8]"
            >
              <span className="text-b3">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
